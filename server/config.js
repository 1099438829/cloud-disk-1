module.exports = {
    port: 3000,
    tokenName: 'react16-koa2',
    cookieOptions: {
        maxAge: 3600 * 24 * 7 * 1000,
        // maxAge: 3600 * 24 * 365 * 1000 * 3,
        path: '/',
        httpOnly: false
    },
    url: 'http://localhost:3000', //开发
    // url: 'https://bstu.cn', // 线上
    url_path: 'http://localhost:3000/img', //开发
    // url_path: 'https://i.bstu.cn/p', // 线上
    img_path: 'C:/Users/ccnn/Desktop/examples/react16-koa2/server/public/img', //开发
    // img_path: '/data/wwwroot/awei-blog/server/public/p', // 线上
};