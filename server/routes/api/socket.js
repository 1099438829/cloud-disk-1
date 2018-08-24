const router = require('koa-router')();
const {checkToken} = require('../token');
const socket = require('../socket');

router.prefix('/api/socket');

router.get('/test', checkToken, function (ctx, next) {
    let sk = socket.set();
    sk.sockets.emit('number', 'BBB');
    ctx.body = ctx.res.user;
});

module.exports = router;
