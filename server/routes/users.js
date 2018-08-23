const router = require('koa-router')()
const OSS = require('ali-oss');
const fs = require('fs');

router.prefix('/users')

let client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIAEWt96MQ6EbR',
    accessKeySecret: 'JxpOyA8axOJgyYyMf0GUKgLsbwNQrG',
    bucket: 'bstu'
});

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.post('/bar', async (ctx, next) => {
    const file = ctx.request.files.file;
    let stream = fs.createReadStream(file.path);
    let result = await client.putStream(file.name, stream);
    ctx.body = result
});

router.get('/list', async (ctx, next) => {

    // console.log(file);
    // let result = await client.list();
    // console.log(result);
    let result = await client.list({
        prefix: '',
        delimiter: '/'
    });
    ctx.body = result
})

router.get('/download', async (ctx) => {
    console.log(ctx.query);
    const name = ctx.query.name;
    let url = client.signatureUrl(name, {expires: 3600});
    ctx.body = url
})

module.exports = router
