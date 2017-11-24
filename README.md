# react16-koa2
react16+koa2脚手架
react 16 + react-router 4 + koa2 按需加载最新脚手架，开箱即用

## 环境

```
    react 16
    react-router 4
    webpack 3
    node-sass
    koa2
    jsonwebtoken

```

----

## 使用

```
    $ git clone https://github.com/sliwei/react16-koa2.git
    $ cd react16-koa2/client
    $ npm i
    $ npm run start
    $ cd react16-koa2/server
    $ npm i
    $ npm run start
    $ open http://localhost:3001
```

## 说明

```
    如果在Windows中node-sass使用npm安装失败，请使用cnpm安装
```

## Examples

https://serve.bstu.cn


## 项目总结

##一、koa2的一些方法

###1.API参数的获取

>get 值（value）是字符串类型
````
http://localhost:3000/api/code?t=1 ctx.query {t: '1'}
http://localhost:3000/api/code/:page ctx.params {page: '123'}
````
>post 类型不变
````
http://localhost:3000/api/code ctx.request.body {t: 1}
````

##二、关于token
> 使用npm库的jsonwebtoken插件，登录或者获取信息时生成token，请求的时候利用中间件验证token合法性

````
// 导入包
const jwt = require('jsonwebtoken');
// 创建token并储存（存在cookie或者session，推荐服务端存cookie）
jwt.sign(dat, conf.tokenName, {
    expiresIn: conf.cookieOptions.maxAge / 1000 + 's'
});
ctx.cookie.set('token', token)  koa的存储方式
````
>关键API验证
````
// 方法
function checkToken() {
    const token = ctx.cookie.get('token');
    jwt.verify(token, conf.tokenName, function (err, decoded) {
        if (err) {
            // token不符合返货错误
            ctx.throw(401, err.name);
        } else {
            // token无误返回
            ctx.res.user = decoded;
        }
    });
}
// 使用
router.get('/look/:page', checkToken, function (ctx, next) {
    console.warn('TokenUser', ctx.res.user);
    ctx.body = ctx.res.user
});
````

##三、关于验证码

> 验证码是为了验证操作这是人类或者机器人，避免资源浪费和恶意请求，通常用于登录注册验证或重要的API

###1.关于验证方式

* (1).验证码
* (2).图形验证码（滑块的位置，图中选字，选择规定图片，最近操作，图片拼合）
* (3).问题答案
* (4).固件验证，短信，证书


###2.使用


* (1).验证码

    思路：
    
    在服务端生成验证字符，保存在服务端（用于用户输入匹配验证），再生成为一张图片（加入混淆元素，防止机器智能识别），返回到客户端，用户根据图片中的字符输入验证码，发送到服务端，服务端将验证码与保存的字符进行对比，符合则验证通过.具体函数：我在node中使用的gd-bmp图片生成库，其他环境可找到相应的图形库

```
// 导入包
var BMP24 = require('gd-bmp').BMP24;
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
```
* (2).图形验证码

    思路：

    ①.滑动>服务端生成图片缺块与滑动图片，保存缺块图片起始位置，返回图片至用户端，用户端滑动图片当图片缺块位置，将滑动
    ②...


##四、关于上传

> 上传

###1.插件koa-multer

````
// 导包
const multer = require('koa-multer')
// 上传图片配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // let path = conf.img_path+getMonth();
        let path = decodeURIComponent(getCookie(req, 'route'));
        console.log('path:'+path);
        if(!fs.existsSync(path)){
            fs.mkdirSync(path);
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        let path = decodeURIComponent(getCookie(req, 'route'));
        fs.readdir(path, function (err, files) {
            let fileName = '';
            function check(files, name, index) {
                let sta = true;
                files.map(function (item) {
                    if (item === name) {
                        sta = false;
                        index++;
                        let newName = name.substr(0, name.lastIndexOf(".")) + '(' + index + ')' + name.substr(name.lastIndexOf(".")).toLowerCase();
                        // 处理多个重名
                        let startName = name.substr(0, name.lastIndexOf("."));
                        let pa = /.*\((.*)\)/;
                        let startNameIndex = startName.match(pa);
                        startNameIndex = (startNameIndex && startNameIndex.length > 1) ? startNameIndex[1] : 'NO';
                        startNameIndex = parseInt(startNameIndex);
                        if (!isNaN(startNameIndex)) {
                            index = startNameIndex + 1;
                            newName = name.substr(0, name.lastIndexOf("(")) + '(' + index + ')' + name.substr(name.lastIndexOf(".")).toLowerCase();
                        }
                        // 处理多个重名
                        check(files, newName, index)
                    }
                });
                if (sta) {
                    fileName = name;
                }
            }
            // 处理重名
            check(files, file.originalname, 0);
            cb(null, fileName)
        });
    }
});
var upload = multer({storage: storage});
 
上传文件
router.post('/upload', upload.array('file'), async(ctx, next) => {
    console.log(11111111111111);
    let message, result, state = true;
    try {
        let files = ctx.req.files;
        console.log(files);
        let mimetype = files[0].mimetype;
        mimetype = mimetype.substring(6, mimetype.length);
        let dest = files[0].destination;
        let name = files[0].filename;
        dest = dest.substring(conf.path_num, dest.length);
        dest = dest.replace(/\\/g, "/");
        let file_path = `${conf.url}/${dest}/${name}`;
        result = {
            "success": true,
            "msg": "up success!",
            "file_path": file_path
        };
        // db.op(`insert into \`file\`(paths,types,is_del) values('${file_path}','${mimetype}',1)`)
    } catch (e) {
        message = e.name + ':' + e.message;
        state = false;
    }
    ctx.body = result;
});
````


