const router = require('koa-router')()
const OSS = require('ali-oss');
const send = require('koa-send');
const fs = require('fs');
// const urllib = require('urllib')



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
    // console.log(file);
    // let result = await client.list();
    // console.log(result);
    // let result = await client.list({
    //     prefix: 'test/',
    //     delimiter: '/'
    // });
    // let result = await client.put('test/a/object-key.txt', new Buffer('hello world'));
    // console.log(result);
    let stream = fs.createReadStream(file.path);
    console.log(stream);
    let result = await client.putStream(file.name, stream);
    console.log(result);
    ctx.body = result
})

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

router.get('/url', async (ctx, next) => {

    let url = client.signatureUrl('b.png', {expires: 3600});

    ctx.body = url
})

router.get('/get', async (ctx, next) => {
    const name = ctx.query.name;
    console.log(name);

    let result = await client.get(name, name);
    console.log(result);
    // let file = await urllib.request(result.res.requestUrls[0])
    // console.log('111',file);
    //
    // let result = await client.getStream(name);
    // let writeStream = fs.createWriteStream(name);
    // result.stream.pipe(writeStream);
    //
    // console.log(result);
    //
    // ctx.set('Content-disposition','attachment;filename='+name);
    // ctx.body = result;

    await send(ctx, result.res.requestUrls[0]);
})

router.get('/download', async (ctx) => {

    // ctx.header('Access-Control-Allow-Origin', '*');
    // ctx.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    // ctx.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    console.log(ctx.query);
    const name = ctx.query.name;
    let url = client.signatureUrl(name, {expires: 3600});
    ctx.attachment(url);
    await send(ctx, url);
})

module.exports = router
