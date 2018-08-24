/**
 * 随机函数
 * @param min
 * @param max
 * @returns {number}
 */
const rand = function (min, max) {
    return Math.random() * (max - min + 1) + min | 0; //特殊的技巧，|0可以强制转换为整数
};

/**
 * 月份生成
 * @returns {string} 如：201808
 */
const getMonth = function () {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth()+1;
    m<10?m='0'+m:null;
    return y+m;
};

/**
 * 随机字符串生成
 * @param len 生成长度 数字类型
 * @returns {string}
 */
const randomString = function (len) {
    len = len || 32;
    var $chars = 'qwertyuioplkjhgfdsazxcvbnm0123456789';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};

/**
 * 获取cookie
 * @param req
 * @param name
 * @returns {string}
 */
const getCookie = function (req, name) {
    let strCookie = req.headers.cookie;
    let arrCookie = strCookie.split("; ");
    for (let i = 0; i < arrCookie.length; i++) {
        let arr = arrCookie[i].split("=");
        if (name === arr[0]) {
            return arr[1];
        }
    }
    return "";
};

module.exports = {
    rand,
    getMonth,
    randomString,
    getCookie,
};