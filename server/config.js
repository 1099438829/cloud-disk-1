module.exports = {
    port: 3000,
    tokenName: 'react16-koa2',
    cookieOptions: {
        maxAge: 1000 * 3600 * 8,
        path: '/',
        httpOnly: false
    },
    url: 'http://localhost:3000', //开发
    // url: 'https://serve.bstu.cn', // 线上
    url_path: 'http://localhost:3000/img', //开发
    // url_path: 'https://serve.bstu.cn/img', // 线上
    img_path: 'C:/Users/ccnn/Desktop/examples/react16-koa2/server/public/img', //开发
    // img_path: '/data/wwwroot/react16-koa2/server/public/img', // 线上
};