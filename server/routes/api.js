const router = require('koa-router')()
const {createToken, checkToken} = require('../token');
var fs = require('fs'), path = require('path');

router.prefix('/api');

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

router.post('/catalog', checkToken, async function (ctx, next) {
    // console.log(ctx.params.index, ctx.params.name);
    console.log(11, ctx.request.body);
    let dat = ctx.request.body;
    let u = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let file = [];
    let route = path.resolve(__dirname, '../public/img');
    if (u && u !== '--Refresh') {
        route = path.resolve(__dirname, '../public/img/'+u);
    }else if(u){
        route = decodeURIComponent(ctx.cookie.get('route'));
    }
    console.log(route);
    ctx.cookie.set('route', encodeURIComponent(route))
    await new Promise((resolve, reject) => {
        fs.readdir(route, function (err, files) {
            console.log(files);
            file = files
            resolve()
        });
    })
    ctx.body = file
});

router.post('/addFolder', checkToken, async function (ctx, next) {
    // console.log(ctx.params.index, ctx.params.name);
    console.log(11, ctx.request.body);
    let dat = ctx.request.body;
    let u = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let sta = false;
    let route = decodeURIComponent(ctx.cookie.get('route'));
    if (!route) {
        route = path.resolve(__dirname, '../public/img')
    }
    await new Promise((resolve, reject) => {
        fs.mkdir(route + '\\' + u, function (err) {
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

router.post('/delFolder', checkToken, async function (ctx, next) {
    // console.log(ctx.params.index, ctx.params.name);
    console.log(11, ctx.request.body);
    let dat = ctx.request.body;
    let u = ('name' in dat && dat.name !== 'undefined') ? dat.name : '';
    let sta = false;
    let route = decodeURIComponent(ctx.cookie.get('route'));
    if (route) {
        await new Promise((resolve, reject) => {
            let path = route + '\\' + u;
            if (fs.lstatSync(path).isDirectory()) {
                deleteFolderRecursive(path);
            } else {
                fs.unlinkSync(path)
            }
            sta = true;
            resolve()
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
