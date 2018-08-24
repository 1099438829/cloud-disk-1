const compose = require('koa-compose');
const glob = require('glob');
const colors = require('colors');
const { resolve } = require('path');
const fs = require('fs');
const path = require('path');

/**
 * 合并路由
 * @returns {Function}
 */
module.exports = function () {
    let routers = [];
    let len = 0;
    let logPath = path.resolve(__dirname, './', 'api_log.txt');
    glob.sync(resolve(__dirname, './', '**/*.js'))
        // 排除非api文件
        .filter(value => (value.indexOf('api.js') === -1))
        .filter(value => (value.indexOf('index.js') === -1))
        .filter(value => (value.indexOf('socketHandler.js') === -1))
        .map(router => {
            let list = require(router).routes().router.stack;
            list.map(item => {
                len++;
                let log = `${item.path} => ${item.methods[item.methods.length - 1]}\r\n`;
                fs.writeFile(logPath, log, {'flag': 'a'}, e => {});
                // console.info(`${item.path} => [${item.methods[item.methods.length - 1]}]`);
                if (item.methods[item.methods.length - 1] === 'POST') {
                    console.info(`${item.path} => [${item.methods[item.methods.length - 1]}]`.magenta);
                } else {
                    console.info(`${item.path} => [${item.methods[item.methods.length - 1]}]`.blue);
                }
            });
            routers.push(require(router).routes());
            routers.push(require(router).allowedMethods())
        });
    let allTxt = `共 ${len} 个API 现在:${new Date().toLocaleString()}\r\n`;
    setTimeout(function () {
        fs.writeFile(logPath, allTxt, {'flag': 'a'}, e => {});
        fs.writeFile(logPath, '\r\n', {'flag': 'a'}, e => {});
        console.warn(`共${len}个API`, `现在:${new Date().toLocaleString()}`.green);
    });
    return compose(routers)
};