/**
 * lw 服务器配置
 * @type {{client, connection, debug}|*}
 */
const db = require('./mysql');

module.exports = {
    port: 3000,
    socket_port: 4000,
    socket_safe: false, // socket 连接如果是https协议，则需要证书
    ssh_options: {      // 证书
        key: '/etc/letsencrypt/live/bstu.cn-0003/privkey.pem',
        ca: '/etc/letsencrypt/live/bstu.cn-0003/chain.pem',
        cert: '/etc/letsencrypt/live/bstu.cn-0003/fullchain.pem'
    },
    db: db,
    tokenName: 'react16-koa2',
    md5Name: 'react16-koa2',
    cookieOptions: {
        maxAge: 1000 * 3600 * 2,
        path: '/',
        httpOnly: false
    },
    url: 'http://localhost:3000', //开发
    // url: 'https://serve.bstu.cn', // 线上
    img_path: 'C:/Users/ccnn/Desktop/examples/react16-koa2/server/public/fileMain', //开发
    // img_path: '/Users/awei/app/react16-koa2/server/public/fileMain', //开发
    // img_path: '/data/wwwroot/react16-koa2/server/public/fileMain', // 线上
    path_num: 58, //开发
    // path_num: 50, //开发
    // path_num: 50, //线上
};