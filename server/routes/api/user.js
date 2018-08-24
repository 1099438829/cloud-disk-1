const router = require('koa-router')();
const {createToken, checkCode} = require('../token');
const md5 = require('js-md5');
const db = require('../../database');

router.prefix('/api/user');

/**
 * lw 登录
 */
router.post('/login', checkCode, async(ctx, next) => {
    let message = '', result = '', code = 200, state = true;
    let dat = ctx.request.body;
    if (ctx.res.user.codeSta) {
        try {
            result = await db.op(`select * from cloud_disk_user where users = "${dat.userName}" and password = "${md5(dat.password)}" limit 1`)
            console.log(typeof result.length);
            if (result.length) {
                ctx.cookie.set('token', createToken(JSON.parse(JSON.stringify(result[0]))));
            }else{
                code = 10002;
                state = false;
                message = '账户名或者密码错误'
            }
        } catch (e) {
            code = 10001;
            state = false;
            message = e.name + ':' + e.message
        }
    } else {
        code = 10000;
        state = false;
        message = '验证码错误'
    }
    ctx.body = {result: result, state: state, message: message, code: code};

});

/**
 * lw 注册
 */
router.post('/register', checkCode, async(ctx, next) => {
    let message = '', result = '', code = 200, state = true;
    let dat = ctx.request.body;
    if (ctx.res.user.codeSta) {
        try {
            await db.op(`insert into cloud_disk_user(users, password) values("${dat.name}", "${md5(dat.rpassword)}")`)
        } catch (e) {
            code = 10001;
            state = false;
            message = e.name + ':' + e.message
        }
    } else {
        code = 10000;
        state = false;
        message = '验证码错误'
    }
    ctx.body = {result: result, state: state, message: message, code: code};
});

module.exports = router;
