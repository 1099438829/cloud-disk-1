const conf = require('../../config');
const md5 = require('js-md5');

/**
 * 检测验证码正确性
 * @param ctx
 * @param next
 * @returns {Promise<void>}
 */
const checkCode = async (ctx, next) => {
    let code = ctx.request.body.code;
    if(ctx.request.method === 'GET'){
        code = ctx.params.code
    }
    let codeSta = false;
    if (code && md5(conf.md5Name + code.toLowerCase()) === ctx.cookie.get('code')) {
        codeSta = true;
    }
    if (!conf.verificationSta) {
        codeSta = true
    }
    ctx.res.user = {codeSta: codeSta};
    await next();
};

module.exports = {checkCode};