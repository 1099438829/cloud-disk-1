/*
 lw mysql 连接池
 */
const {db} = require('../config');
const mysql = require('mysql');
const pool = mysql.createPool(db.connection);

/**
 * lw 打开数据库连接,执行sql语句,返回相应结果
 * @param sql sql语句
 * @param values 占位符对应值
 * @param callback 返回执行结果
 */
function execQuery(sql, values, callback) {
    let errInfo;
    pool.getConnection(function (err, connection) {
        if (err) {
            errInfo = 'MYSQL获取数据库连接异常！';
            throw errInfo;
        } else {
            console.log(`SQL: [${sql}] ${values}`.bgWhite.black);
            connection.query(sql, values, function (err, rows) {
                release(connection);
                if (err) {
                    errInfo = 'MYSQL语句执行错误:' + err;
                    callback(err);
                } else {
                    //注意：第一个参数必须为null
                    callback(null, rows)
                }
            });
        }
    });
}

/**
 * lw 关闭数据库连接
 * @param connection
 */
function release(connection) {
    try {
        connection.release(function (error) {
            if (error) {
                console.log('MYSQL关闭数据库连接异常！');
            }
        });
    } catch (err) {
    }
}

module.exports = {
    execQuery: execQuery
};