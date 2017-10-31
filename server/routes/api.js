const router = require('koa-router')()
const {createToken, checkToken} = require('../token');
var fs = require('fs'), path = require('path');

router.prefix('/api');

/**
 * lw 登录
 */
router.post('/login', function (ctx, next) {
    console.warn('login createToken', ctx.body);
    let token = createToken({id: 10, name: 'liwei'});
    ctx.cookie.set('token', token)
    ctx.body = {
        state: true
    }
});

router.get('/look/:page', checkToken, function (ctx, next) {
    console.warn('PAGE', ctx.params.page);
    console.warn('TokenUser', ctx.res.user);
    ctx.body = ctx.res.user
});
/**
 * lw 获取目录列表
 */
router.post('/catalog', checkToken, async function (ctx, next) {
    let dat = ctx.request.body;
    let url = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let file = [], data = [];
    let route = path.resolve(__dirname, '../public/img/' + url);
    console.log('route:' + route);
    ctx.cookie.set('route', encodeURIComponent(route));
    await new Promise((resolve, reject) => {
        fs.readdir(route, function (err, files) {
            data = files;
            resolve()
        });
    });
    for (let i=0; i<data.length; i++){
        let curPath = route + "/" + data[i];
        await new Promise((resolve, reject) => {
            fs.stat(curPath, function (err, stats) {
                if (err) {
                    return console.error(err);
                }
                // console.log(stats);
                // console.log("读取文件信息成功！");
                // // 检测文件类型
                // console.log("是否为文件(isFile) ? " + stats.isFile());
                // console.log("是否为目录(isDirectory) ? " + stats.isDirectory());
                file.push({
                    name: data[i],
                    isDirectory: stats.isDirectory(),
                    type: data[i],
                    stats: stats
                })
                console.log(file);
                resolve()
            });
        });
    }
    ctx.body = {
        list: file,
        url: url
    }
});

/**
 * lw 新建文件夹
 */
router.post('/addFolder', checkToken, async function (ctx, next) {
    let dat = ctx.request.body;
    let url = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let sta = false;
    let route = path.resolve(__dirname, '../public/img/' + url);
    await new Promise((resolve, reject) => {
        fs.mkdir(route, function (err) {
            if(err)
                throw err;
            sta = true;
            console.log('创建目录成功')
            resolve()
        });
    })
    ctx.body = sta
});

deleteFolderRecursive = function (path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function (file, index) {
            let curPath = path + "/" + file;
            // recurse
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

/**
 * lw 删除文件夹
 */
router.post('/delFolder', checkToken, async function (ctx, next) {
    let dat = ctx.request.body;
    let url = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let sta = false;
    let route = path.resolve(__dirname, '../public/img/' + url);
    if (route) {
        await new Promise((resolve, reject) => {
            if (fs.lstatSync(route).isDirectory()) {
                deleteFolderRecursive(route);
            } else {
                fs.unlinkSync(route)
            }
            sta = true;
            resolve()
        });
    } else {
        sta = false;
    }
    ctx.body = sta
});


/**
 * lw 删除文件夹
 */
router.post('/editFolder', checkToken, async function (ctx, next) {
    let dat = ctx.request.body;
    let url = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let newUrl = ('newName' in dat && dat.newName !== 'undefined') ? dat.newName : '';
    let sta = false;
    let route = path.resolve(__dirname, '../public/img/' + url);
    let newRoute = path.resolve(__dirname, '../public/img/' + newUrl);
    if (route) {
        await new Promise((resolve, reject) => {
            fs.rename(route, newRoute, function (err) {
                if(err)
                    throw err;
                sta = true;
                console.log('修改名称成功！')
                resolve()
            });
        });
    } else {
        sta = false;
    }
    ctx.body = sta
});

router.post('/user', checkToken, function (ctx, next) {
    ctx.body = ctx.res.user
});

module.exports = router
