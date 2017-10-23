module.exports = {
    port: 3000,
    tokenName: 'react16-koa2',
    cookieOptions: {
        maxAge: 3600 * 24 * 7 * 1000,
        // maxAge: 3600 * 24 * 365 * 1000 * 3,
        path: '/',
        httpOnly: false
    },
};