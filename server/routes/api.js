const router = require('koa-router')()
const {createToken, checkToken} = require('../token');

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

router.post('/user', checkToken, function (ctx, next) {
    ctx.body = ctx.res.user
});

module.exports = router
