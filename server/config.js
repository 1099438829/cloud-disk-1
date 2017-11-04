module.exports = {
    port: 3000,
    tokenName: 'react16-koa2',
    cookieOptions: {
        maxAge: 1000 * 3600 * 2,
        path: '/',
        httpOnly: false
    },
    url: 'http://localhost:3000', //开发
    // url: 'https://serve.bstu.cn', // 线上
    img_path: 'C:/Users/ccnn/Desktop/examples/react16-koa2/server/public/img', //开发
    // img_path: '/Users/awei/app/react16-koa2/server/public/img', //开发
    // img_path: '/data/wwwroot/react16-koa2/server/public/img', // 线上
    path_num: 58, //开发
    // path_num: 50, //开发
    // path_num: 50, //线上
};