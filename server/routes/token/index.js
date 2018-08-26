const jwt = require('jsonwebtoken');
const conf = require('../../config');
const md5 = require('js-md5');

/**
 * 创建token
 * @param dat
 * @returns {*}
 */
const createToken = function (dat) {
    return jwt.sign(dat, conf.tokenName, {
        expiresIn: conf.cookieOptions.maxAge / 1000 + 's'
    });
};

/**
 * 检测token合法性
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const checkToken = async (ctx, next) => {
    // Authorization TODO:如果需要允许所有跨域，那么只有不使用cookie，改为Authorization存token
    // const token = ctx.get('Authorization');
    const token = ctx.cookie.get('token');
    if (!token) {
        ctx.throw(401, '没有找到用户信息');
    }
    try {
        jwt.verify(token, conf.tokenName, function (err, decoded) {
            if (err) {
                ctx.throw(401, err.name);
            } else {
                !('check' in ctx.res) ? ctx.res.check = {} : null;
                ctx.res.check.user = decoded;
            }
        });
    } catch (err) {
        ctx.throw(401, '用户信息失效');
    }
    await next();
};

module.exports = {
    createToken,
    checkToken
};