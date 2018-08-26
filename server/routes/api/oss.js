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

module.exports = router;
