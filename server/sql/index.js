/*
 lw 数据库数据处理
 */
const mysql = require('./connection');

/**
 * lw 表查询
 * @param tablename 表名
 * @returns {Promise} 该表所有列
 */
const findAll = function (tablename) {
    return new Promise(function (resolve, reject) {
        var sql = 'select * from ??';
        mysql.execQuery(sql, [tablename], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
};

/**
 * lw 查询
 * @param tablename 表
 * @param require 条件
 * @returns {Promise} 返回
 */
const find = function (tablename, require) {
    return new Promise(function (resolve, reject) {
        var sql = 'select * from ?? where ?';
        mysql.execQuery(sql, [tablename, require], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
};

/**
 * lw 修改表的字段
 * @param tablename 表
 * @param one 修改值
 * @param twe 条件
 * @returns {Promise} 修改状态
 */
const update = function (tablename, one, twe) {
    return new Promise(function (resolve, reject) {
        var sql = 'update ?? set ? where ?';
        mysql.execQuery(sql, [tablename, one, twe], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
};

/**
 * lw 自定义sql,遵循mysql原生语法(关键字表名用`包裹)
 * @param sql
 * @returns {Promise}
 */
const op = function (sql) {
    return new Promise(function (resolve, reject) {
        mysql.execQuery(sql, [], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        })
    });
};

/**
 * lw 分页
 * @param sql
 * @param page
 * @param num
 * @returns {Promise}
 */
const findLimit = function (sql, page, num) {
    return new Promise(function (resolve, reject) {
        let count_sql = 'select count(*) as total ' + sql;
        mysql.execQuery(count_sql, [], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                // resolve(rows);
                var total = rows;
                var red = (page * num) - num;
                let mon_sql = 'select * ' + sql + ` limit ${red}, ${num}`;
                mysql.execQuery(mon_sql, [], function (err, rows) {
                    if (err) {
                        reject(err);
                    } else {
                        let dat = {
                            limit: total[0],
                            rows: rows
                        };
                        resolve(dat);
                    }
                });
            }
        });

    })
}

module.exports = {
    findAll: findAll,
    find: find,
    update: update,
    op: op,
    findLimit: findLimit,
};
