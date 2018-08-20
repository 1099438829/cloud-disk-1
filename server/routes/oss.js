const router = require('koa-router')();
const OSS = require('ali-oss');

router.prefix('/api');

let client = new OSS({
    region: 'oss-cn-shenzhen',
    accessKeyId: 'LTAIAEWt96MQ6EbR',
    accessKeySecret: 'JxpOyA8axOJgyYyMf0GUKgLsbwNQrG',
    bucket: 'bstu'
});

router.get('/dow', async (ctx) => {
    console.log(ctx.query);
    const name = ctx.query.name;
    let url = client.signatureUrl(name, {expires: 3600});
    ctx.body = url
    // ctx.attachment(url);
    // await send(ctx, url);
});

module.exports = router;
