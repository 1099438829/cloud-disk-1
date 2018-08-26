/**
 * lw 服务器配置
 */
const db = require('./mysql');

module.exports = {
    port: 3012,         // 端口
    socket_port: 4002,  // socket端口
    socket_safe: false, // socket 连接如果是https协议，则需要证书
    ssh_options: {      // https证书
        key: '/etc/letsencrypt/live/yun.bstu.cn/privkey.pem',
        ca: '/etc/letsencrypt/live/yun.bstu.cn/chain.pem',
        cert: '/etc/letsencrypt/live/yun.bstu.cn/fullchain.pem'
    },
    db: db,
    tokenName: 'cloud-disk',
    md5Name: 'cloud-disk',
    verificationSta: false, // 启用验证码
    cookieOptions: {
        maxAge: 1000 * 3600 * 2,
        path: '/',
        httpOnly: false
    },
    url: 'http://localhost:3000', // 开发
    // url: 'https://yun.bstu.cn', // 线上
    img_path: 'C:/Users/ccnn/Desktop/examples/cloud-disk/server/public/fileMain', // win开发
    // img_path: '/Users/awei/app/cloud-disk/server/public/fileMain', // mac开发
    // img_path: '/data/wwwroot/cloud-disk/server/public/fileMain', // linux线上
    path_num: 56,       // win开发
    // path_num: 41,    // mac开发
    // path_num: 39,    // linux线上
    oss: {
        region: 'oss-cn-shenzhen',
        accessKeyId: 'LTAIAEWt96MQ6EbR',
        accessKeySecret: 'JxpOyA8axOJgyYyMf0GUKgLsbwNQrG',
        bucket: 'bstu'
    },
};