const router = require('koa-router')();
const fs = require('fs');
const oss = require('../oss');

router.prefix('/api/oss');

router.post('/upload', async (ctx, next) => {
    const file = ctx.request.files.file;
    let stream = fs.createReadStream(file.path);
    let result = await oss.putStream(file.name, stream);
    ctx.body = result;
});

router.get('/list', async (ctx, next) => {
    let result = await oss.list({
        prefix: '',
        delimiter: '/'
    });
    ctx.body = result;
});

router.get('/url', async (ctx) => {
    console.log(ctx.query);
    const name = ctx.query.name;
    let url = oss.signatureUrl(name, {expires: 3600});
    ctx.body = url;
});

module.exports = router;
