const router = require('koa-router')();
const {createToken, checkToken} = require('../token');
const {checkCode} = require('../verification');
const md5 = require('js-md5');
const db = require('../../database');

router.prefix('/api/user');

/**
 * lw 当前登录信息
 */
router.post('/info', checkCode, checkToken, async(ctx, next) => {
    let message = '', data = '', code = 200, state = true;
    let user = ctx.res.check.user;
    let userDat = await db.op(`select * from cloud_disk_user where id = ${user.id}`);
    data = {
        name: userDat[0].name,
        users: userDat[0].users,
        sex: userDat[0].sex,
        login_time: userDat[0].login_time,
        head_img: userDat[0].head_img
    };
    ctx.body = {data: data, state: state, message: message, code: code};
});

/**
 * lw 登录
 */
router.post('/login', checkCode, async(ctx, next) => {
    let message = '', data = '', code = 200, state = true;
    let dat = ctx.request.body;
    if (ctx.res.check.code) {
        try {
            data = await db.op(`select id from cloud_disk_user where users = "${dat.userName}" and password = "${md5(dat.password)}" limit 1`)
            if (data.length) {
                ctx.cookie.set('token', createToken({id: data[0].id}));
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

    ctx.body = {data: data, state: state, message: message, code: code};

});

/**
 * lw 注册
 */
router.post('/register', checkCode, async(ctx, next) => {
    let message = '', data = '', code = 200, state = true;
    let dat = ctx.request.body;
    if (ctx.res.check.code) {
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
    ctx.body = {data: data, state: state, message: message, code: code};
});

module.exports = router;
