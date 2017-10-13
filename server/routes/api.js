const router = require('koa-router')()
const {createToken, checkToken} = require('../token');

router.prefix('/api');

router.get('/login', function (ctx, next) {
    console.log('login createToken');
    let token = createToken({id: 10, name: 'liwei'});
    ctx.body = token
});

router.get('/look/:page', checkToken, function (ctx, next) {
    console.warn('PAGE', ctx.params.page);
    console.warn('TokenUser', ctx.res.user);
    ctx.body = ctx.res.user
});

module.exports = router
