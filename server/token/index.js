const jwt = require('jsonwebtoken');
const conf = require('../config');
const md5 = require('js-md5');

// 创建token
const createToken = function (dat) {
    return jwt.sign(dat, conf.tokenName, {
        expiresIn: conf.cookieOptions.maxAge / 1000 + 's'
    });
};

// 检测token合法性
const checkToken = async (ctx, next) => {
    // const token = ctx.get('Authorization');
    let code = ctx.request.body.code;
    if(ctx.request.method === 'GET'){
        code = ctx.params.code
    }
    let codeSta = false;
    if (code && md5(conf.md5Name + code.toLowerCase()) === ctx.cookie.get('code')) {
        codeSta = true;
    }
    const token = ctx.cookie.get('token');
    if (!token) {
        ctx.throw(401, '没有找到用户信息');
    }
    try {
        jwt.verify(token, conf.tokenName, function (err, decoded) {
            if (err) {
                ctx.throw(401, err.name);
            } else {
                decoded.codeSta = codeSta;
                ctx.res.user = decoded;
            }
        });
    } catch (err) {
        ctx.throw(401, '用户信息失效');
    }
    await next();
};

// 检测验证码正确性
const checkCode = async (ctx, next) => {
    let code = ctx.request.body.code;
    console.log('AAA');
    if(ctx.request.method === 'GET'){
        code = ctx.params.code
    }
    let codeSta = false;
    console.log(code, md5(conf.md5Name + code.toLowerCase()), ctx.cookie.get('code'));
    if (code && md5(conf.md5Name + code.toLowerCase()) === ctx.cookie.get('code')) {
        codeSta = true;
    }
    if (!conf.verificationSta) {
        codeSta = true
    }
    ctx.res.user = {codeSta: codeSta};
    await next();
};

module.exports = {createToken, checkToken, checkCode}