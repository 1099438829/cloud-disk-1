const router = require('koa-router')();

router.prefix('/api/test');

router.get('/get', function (ctx, next) {
    ctx.body = 'this is a get test!'
});

router.post('/post', function (ctx, next) {
    let message = '', data = '', code = 200, state = true;
    data = ctx.request.body;
    message = 'this is a post test!';
    ctx.body = {data: data, state: state, message: message, code: code};
});

module.exports = router;
