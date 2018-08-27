const router = require('koa-router')();
const fs = require('fs');
const oss = require('../oss');

router.prefix('/api/oss');

router.post('/upload', async (ctx, next) => {
    let message = '', data = '', code = 200, state = true;
    const file = ctx.request.files.file;
    let stream = fs.createReadStream(file.path);
    data = await oss().putStream(file.name, stream);
    ctx.body = {data: data, state: state, message: message, code: code};
});

router.get('/list', async (ctx, next) => {
    let message = '', data = '', code = 200, state = true;
    const name = ctx.query.name;
    data = await oss().list({
        prefix: name,
        delimiter: '/'
    });
    ctx.body = {data: data, state: state, message: message, code: code};
});

router.get('/url', async (ctx) => {
    let message = '', data = '', code = 200, state = true;
    const name = ctx.query.name;
    data = oss().signatureUrl(name, {expires: 3600});
    ctx.body = {data: data, state: state, message: message, code: code};
});

router.post('/del', async (ctx) => {
    let dat = ctx.request.body;
    let delList = dat[0];
    let directory = dat[1];
    try {
        for (let i = 0; i < directory.length; i++) {
            let retList = await oss().list({
                prefix: directory[i]
            });
            retList.objects.reverse();
            retList.objects.map(item => {
                delList.push(item.name)
            });
        }
    } catch (e) {
        ctx.DATA.code = '0';
        ctx.DATA.message = '整理删除文件失败';
        ctx.body = ctx.DATA;
    }
    let result = await oss().deleteMulti(delList, {quiet: true});
    if (result.res.status === 200) {
        ctx.DATA.message = '删除成功';
        ctx.body = ctx.DATA;
    } else {
        ctx.DATA.code = '0';
        ctx.DATA.message = '删除失败';
        ctx.body = ctx.DATA;
    }
});

module.exports = router;
