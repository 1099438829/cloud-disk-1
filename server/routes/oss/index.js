const OSS = require('ali-oss');
const conf = require('../../config');

module.exports = function() {
    return new OSS(conf.oss);
};