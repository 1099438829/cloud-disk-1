const jwt = require('jsonwebtoken');
const conf = require('../config');

// 创建token
const createToken = function (dat) {
    return jwt.sign(dat, conf.tokenName, {
        expiresIn: '21600s'
    });
};

// 检测token合法性
const checkToken = async (ctx, next) => {
    const token = ctx.get('Authorization');
    if (token === '') {
        ctx.throw(401, 'no token detected in http header Authorization');
    }
    try {
        console.log(token);
        jwt.verify(token, conf.tokenName, function (err, decoded) {
            console.warn(19, err, decoded);
            if (err) {
                ctx.throw(401, err.name);
            } else {
                ctx.res.user = decoded;
            }
        });
    } catch (err) {
        ctx.throw(401, 'invalid token');
    }
    await next();
};

module.exports = {createToken, checkToken}