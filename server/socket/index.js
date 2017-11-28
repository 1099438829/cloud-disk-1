/**
 * Created by awei on 2017/3/26.
 * socketIo
 */
const https = require('https');
const http = require('http');
const socketIo = require('socket.io');
const fs = require('fs');
const conf = require('../config');
const db = require('../sql')

var socket = {}

// 特殊字符转义
function ClearBr(key) {
    key = key.replace(/<\/?.+?>/g, "");
    key = key.replace(/[\r\n]/g, "");
    key = key.replace(/\s+/g, "");
    key = key.replace(/\'/g, "\'");
    key = key.replace(/\"/g, "\\\"");
    return key;
}

function sql() {
    return db.op('select * from r_user');
}

function set() {
    return socket
}


function srever(app) {
    // https conf
    let options = {}, server;
    if (conf.socket_safe) {
        options = {
            key: fs.readFileSync(conf.ssh_options.key),
            ca: fs.readFileSync(conf.ssh_options.ca),
            cert: fs.readFileSync(conf.ssh_options.cert)
        };
        server = https.Server(options, app.callback()).listen(conf.socket_port);
    } else {
        server = http.Server(app.callback()).listen(conf.socket_port);
    }
    let io = socketIo(server);
    socket = io
    let number = 0, ids = [];
    io.on('connection', async function (socket) {
        // 连接人数
        let socket_id = socket.id || undefined;
        ids.push(socket_id);
        number++;
        let u =await sql()
        console.warn(u);
        io.sockets.emit('number', u);

        socket.emit('id', socket_id);
        console.log('上线通知：[' + socket_id + '], 当前在线人' + number);
        // 读取历史
        // fs.readFile('./message.txt', 'utf-8', function(err, data) {
        //   if (err) {
        //     throw err;
        //   }
        //   socket.emit('message_dat', data);
        // });
        //丢失连接
        socket.on('disconnect', function (d) {
            // 减少人数
            number--;
            io.sockets.emit('number', number);
            console.log('离线通知：[' + socket_id + '], 当前在线人' + number);
            ids.map(function (item, index) {
                if (item == socket_id)
                    ids.splice(index, 1);
            });
        });
        // 接收信息
        socket.on('message', res => {
            res = ClearBr(res);
            let t = new Date();
            let h = t.getHours() >= 10 ? t.getHours() : `0${t.getHours()}`;
            let m = t.getMinutes() >= 10 ? t.getMinutes() : `0${t.getMinutes()}`;
            let s = t.getSeconds() >= 10 ? t.getSeconds() : `0${t.getSeconds()}`;
            console.log(`信息: ${h}:${m}:${s} ${res}`);
            // 保存记录
            let message = `{"code": "${socket_id}", "text": "${res}", "time": "${t.toISOString().slice(0, 10)} ${t.toISOString().slice(11, 19)}"}`;
            fs.writeFile('./message.txt', `${message},`, {'flag': 'a'}, function (err) {
                if (err) {
                    throw err;
                }
            });
            // 向所有连接发送信息
            io.sockets.emit('message', message);
        });
        // ...
    });
}

module.exports = {
    srever: srever,
    set: set
}