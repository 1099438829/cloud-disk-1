const router = require('koa-router')()
const {createToken, checkToken} = require('../token');
var fs = require('fs'), path = require('path');
router.prefix('/api');

router.post('/login', function (ctx, next) {
    console.warn('login createToken', ctx.body);
    let token = createToken({id: 10, name: 'liwei'});
    ctx.cookie.set('token', token)
    ctx.body = {
        state: true
    }
});

router.get('/look/:page', checkToken, function (ctx, next) {
    console.warn('PAGE', ctx.params.page);
    console.warn('TokenUser', ctx.res.user);
    ctx.body = ctx.res.user
});

router.post('/catalog', checkToken, async function (ctx, next) {
    // console.log(ctx.params.index, ctx.params.name);
    console.log(11, ctx.request.body);
    let dat = ctx.request.body;
    let u = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let file = [];
    await new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, '../public/img/'+u), function (err, files) {
            console.log(files);
            file = files
            resolve()
        });
    })
    ctx.body = file
});

router.post('/user', checkToken, function (ctx, next) {
    ctx.body = ctx.res.user
});

module.exports = router
