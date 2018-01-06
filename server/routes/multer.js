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
/**
 * lw 上传文件
 */
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
        console.log(dest);
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

module.exports = router;