/**
 * lw 数据库配置
 */
module.exports = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '123456',
        database: 'bdm296810572_db',
        charset: 'utf8',
        insecureAuth: true
    },
    debug: true,
};