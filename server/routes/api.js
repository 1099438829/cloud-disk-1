const router = require('koa-router')()
const {createToken, checkToken, checkCode} = require('../token');
var fs = require('fs'), path = require('path');
var BMP24 = require('gd-bmp').BMP24;
var md5 = require('js-md5');
const conf = require('../config');

router.prefix('/api');

/**
 * lw 登录
 */
router.post('/login', checkCode, function (ctx, next) {
    console.warn('login createToken', ctx.res.user);
    let ret = {
        state: false,
        message: '验证码错误',
        code: 10000
    };
    if (ctx.res.user.codeSta) {
        ret = {
            state: true
        };
        let token = createToken({id: 10, name: 'liwei'});
        ctx.cookie.set('token', token);
    }
    ctx.body = ret
});

/**
 * lw 登录
 */
router.post('/register', checkCode, function (ctx, next) {
    console.log('注册信息：', ctx.request.body);
    let ret = {
        state: false,
        message: '验证码错误',
        code: 10000
    };
    if (ctx.res.user.codeSta) {
        ret = {
            state: true
        }
    }
    ctx.body = ret
});

router.get('/look/:page', checkToken, function (ctx, next) {
    console.warn('PAGE', ctx.params);
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
    let route = path.resolve(__dirname, '../public/fileMain/' + url);
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
                // console.log(file);
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
    let route = path.resolve(__dirname, '../public/fileMain/' + url);
    await new Promise((resolve, reject) => {
        // TODO: 新建同名文件夹处理
        // let path = decodeURIComponent(getCookie(req, 'route'));
        // fs.readdir(path, function (err, files) {
        //     let fileName = '';
        //
        //     function check(files, name, index) {
        //         let sta = true;
        //         files.map(function (item) {
        //             if (item === name) {
        //                 sta = false;
        //                 index++;
        //                 let newName = name.substr(0, name.lastIndexOf(".")) + '(' + index + ')' + name.substr(name.lastIndexOf(".")).toLowerCase();
        //                 // 处理多个重名
        //                 let startName = name.substr(0, name.lastIndexOf("."));
        //                 let pa = /.*\((.*)\)/;
        //                 let startNameIndex = startName.match(pa);
        //                 startNameIndex = (startNameIndex && startNameIndex.length > 1) ? startNameIndex[1] : 'NO';
        //                 startNameIndex = parseInt(startNameIndex);
        //                 if (!isNaN(startNameIndex)) {
        //                     index = startNameIndex + 1;
        //                     newName = name.substr(0, name.lastIndexOf("(")) + '(' + index + ')' + name.substr(name.lastIndexOf(".")).toLowerCase();
        //                 }
        //                 // 处理多个重名
        //                 check(files, newName, index)
        //             }
        //         });
        //         if (sta) {
        //             fileName = name;
        //         }
        //     }
        //
        //     // 处理重名
        //     check(files, file.originalname, 0);
        // })


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
    let route = path.resolve(__dirname, '../public/fileMain/' + url);
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
    let route = path.resolve(__dirname, '../public/fileMain/' + url);
    let newRoute = path.resolve(__dirname, '../public/fileMain/' + newUrl);
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

// 随机函数
function rand(min, max) {
    return Math.random() * (max - min + 1) + min | 0; //特殊的技巧，|0可以强制转换为整数
}

// 生成验证码并返回
router.get('/code', async function (ctx, next) {
    console.log(ctx.query.t);
    let imgs = '', type = ctx.query.t || 0;
    await new Promise((resolve, reject) => {
        BMP24.loadFromFile(path.resolve(__dirname, 'a.bmp'), function (err, img) {
            // 边框
            // img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
            // 圆
            img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));
            // 块
            img.fillRect(rand(0, 100), rand(0, 40), rand(10, 35), rand(10, 35), rand(0, 0xffffff));
            // 线
            img.drawLine(rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), rand(0, 0xffffff));
            // 画曲线
            let w = img.w / 2;
            let h = img.h;
            let color = rand(0, 0xffffff);
            let y1 = rand(-5, 5); //Y轴位置调整
            let w2 = rand(10, 15); //数值越小频率越高
            let h3 = rand(4, 6); //数值越小幅度越大
            let bl = rand(1, 5);
            for (let i = -w; i < w; i += 0.1) {
                let y = Math.floor(h / h3 * Math.sin(i / w2) + h / 2 + y1);
                let x = Math.floor(i + w);
                for (let j = 0; j < bl; j++) {
                    img.drawPoint(x, y + j, color);
                }
            }
            let p = "ABCDEFGHKMNPQRSTUVWXYZ3456789";
            let str = '';
            for (let i = 0; i < 4; i++) {
                str += p.charAt(Math.random() * p.length | 0);
            }
            ctx.cookie.set('code', md5(conf.md5Name + str.toLowerCase()));
            let fonts = [BMP24.font8x16, BMP24.font12x24, BMP24.font16x32];
            let x = 15, y = 8;
            for (let i = 0; i < str.length; i++) {
                let f = fonts[Math.random() * fonts.length | 0];
                y = 8 + rand(-10, 10);
                img.drawChar(str[i], x, y, f, rand(0, 0xffffff));
                x += f.w + rand(2, 8);
            }
            imgs = img;
            resolve();
        })
    });
    ctx.set('Content-Type', 'image/bmp');
    ctx.body = !parseInt(type) ? 'data:image/bmp;base64,' + imgs.getFileData().toString('base64') : imgs.getFileData();
});

module.exports = router
