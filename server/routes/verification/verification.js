const router = require('koa-router')();
const path = require('path');
const BMP24 = require('gd-bmp').BMP24;
const svgCaptcha = require('svg-captcha');;
const md5 = require('js-md5');
const conf = require('../../config');
const {rand} = require('../tool');

router.prefix('/api/verification');

/**
 * 生成数字字母验证码
 */
router.get('/code', async function (ctx, next) {
    let imgs = '', type = ctx.query.t || 0;
    await new Promise((resolve, reject) => {
        BMP24.loadFromFile(path.resolve(__dirname, '../static', 'verificationBg.bmp'), function (err, img) {
            // 边框
            // img.drawRect(0, 0, img.w - 1, img.h - 1, rand(0, 0xffffff));
            // 圆
            img.drawCircle(rand(0, 100), rand(0, 40), rand(10, 40), rand(0, 0xffffff));
            // 块
            img.fillRect(200, 200, 0, 0, 100000000000000);
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

/**
 * 生成数字字母验证码
 */
router.get('/code2', async function (ctx, next) {
    console.log(ctx.query);
    let fontSize = ctx.query.size || 40;
    let width = ctx.query.w || 150;
    let height = ctx.query.h || 50;
    svgCaptcha.options.fontSize = fontSize; // captcha的宽度
    svgCaptcha.options.width = width; // 验证码的高度
    svgCaptcha.options.height = height; // captcha文本大小
    // svgCaptcha.options.charPreset = charPreset; // 随机字符预设
    let captcha = svgCaptcha.create({
        size: 4,
        ignoreChars: '0o1iLlI',
        noise: 2,
        color: true,
        // background: '#cc9966'
    });
    ctx.cookie.set('code', md5(conf.md5Name + captcha.text));
    ctx.body = captcha.data;
});

module.exports = router;
