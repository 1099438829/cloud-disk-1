/**
 * Created by awei on 2017/3/26.
 */
const conf = require('../config');
const fs = require('fs');
var router = require('koa-router')();
const multer = require('koa-multer'); //http://npm.taobao.org/package/multer
// const db = require('../connect');
const {getCookie} = require('./getCookie')

router.prefix('/multer');

/**
 * 月份生成
 * @returns {string}
 */
function getMonth() {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    m<10?m='0'+m:null;
    return '/'+y+m;
}
/**
 * 随机字符串生成
 * @param len
 * @returns {string}
 */
function randomString(len) {
    len = len || 32;
    var $chars = 'qwertyuioplkjhgfdsazxcvbnm0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
/**
 * 上传图片配置
 */
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
        cb(null, randomString(20)+'.'+file.originalname)
    }
});
var upload = multer({storage: storage});
/**
 * lw 上传文件
 */
router.post('/save_img', upload.array('file'), async(ctx, next) => {
    console.log(11111111111111);
    let message, result, state = true;
    try {
        let files = ctx.req.files;
        let mimetype = files[0].mimetype;
        mimetype = mimetype.substring(6, mimetype.length);
        let dest = files[0].destination;
        let name = files[0].filename;
        dest = dest.substring(dest.length-6, dest.length);
        let file_path = `${conf.url_path}/${dest}/${name}`;
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

module.exports = router;