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
    let user = ctx.res.check.user;
    let userDat = await db.op(`select * from cloud_disk_user where id = ${user.id}`);
    ctx.DATA.data = {
        name: userDat[0].name,
        users: userDat[0].users,
        sex: userDat[0].sex,
        login_time: userDat[0].login_time,
        head_img: userDat[0].head_img
    };
    ctx.body = ctx.DATA;
});

/**
 * lw 登录
 */
router.post('/login', checkCode, async(ctx, next) => {
    let dat = ctx.request.body;
    if (!ctx.res.check.code) {
        ctx.DATA.code = 0;
        ctx.DATA.message = '验证码错误';
        ctx.body = ctx.DATA;
    }
    let data = await db.op(`select id from cloud_disk_user where users = "${dat.userName}" and password = "${md5(dat.password)}" limit 1`)
    if (data.length) {
        ctx.cookie.set('token', createToken({id: data[0].id}))
    }else{
        ctx.DATA.code = 0;
        ctx.DATA.message = '账户名或密码错误'
    }
    ctx.body = ctx.DATA;
});

/**
 * lw 注册
 */
router.post('/register', checkCode, async(ctx, next) => {
    let dat = ctx.request.body;
    if (!ctx.res.check.code) {
        ctx.DATA.code = 0;
        ctx.DATA.message = '验证码错误';
        ctx.body = ctx.DATA;
    }
    let news = await db.op(`insert into cloud_disk_user(users, password) values("${dat.name}", "${md5(dat.rpassword)}")`);
    if (news.affectedRows > 0) {
        ctx.body = ctx.DATA;
    } else {
        ctx.DATA.code = 0;
        ctx.DATA.message = '注册失败';
        ctx.body = ctx.DATA;
    }
});

module.exports = router;
