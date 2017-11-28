let io = require('socket.io');
let http = require('http');

module.exports.createServer = createServer;
module.exports.addUser = addUser;
module.exports.otherUsers = otherUsers;

/*
 * 内部数据结构：用户列表
 *  [{name, session_id, socket} ...]
 * */
let users = [];

function findInUsers(session_id) {//通过session_id查找
    let index = -1;
    for (let j = 0, len = users.length; j < len; j++) {
        if (users[j].session_id === session_id)
            index = j;
    }
    return index;
}
function addUser(name, session_id) {//添加用户
    let index = findInUsers(session_id);
    if (index === -1) //not exist
        users.push({name: name, session_id: session_id, socket: null});
    else {
        if (users[index].name !== name) //update name
            users[index].name = name;
    }
}
function setUserSocket(session_id, socket){//更新用户socket
    let index = findInUsers(session_id);
    if (index !== -1){
        users[index].socket = socket;
    }
}
function findUser(session_id) {//查找
    let index = findInUsers(session_id);
    return index > -1 ? users[index] : null;
}
function otherUsers(session_id){//其他人
    let results = [];
    for (let j = 0, len = users.length; j < len; j++) {
        if (users[j].session_id !== session_id)
            results.push({session_id: users[j].session_id, name: users[j].name});
    }
    return results;
}

/*
 * @app: Koa application
 * */
function createServer(app) {
    let server = http.Server(app.callback());
    io = io(server);
    messageHandler(io);
    return server;
}

/*
 * socket event handler
 */
function messageHandler(io) {
    io.on('connection', function (socket) {
        console.log(socket.id, ' just connected.');
        let sessionId = getSessionId(socket.request.headers.cookie, 'koa:sess');
        if(sessionId){
            setUserSocket(sessionId, socket);
        }

        socket.on('broadcast', function (data) {
            //广播
            let fromUser = findUser(sessionId);
            if(fromUser) {
                socket.broadcast.emit('broadcast', {
                    name: fromUser.name,
                    msg: data.msg
                });
            }
        });

        socket.on('private', function (data) {
            //私聊　{to_session_id, msg}
            let fromUser = findUser(sessionId);
            if(fromUser) {
                let toUser = findUser(data.to_session_id);
                if (toUser)
                    toUser.socket.emit('private', {
                        name: fromUser.name,
                        msg: data.msg
                    });
            }
        });

        socket.on('disconnect', function () {
            console.log(this.id, ' has been disconnect.');
        });
    });
}

function getSessionId(cookieString, cookieName) {
    let matches = new RegExp(cookieName + '=([^;]+);', 'gmi').exec(cookieString);
    return matches[1] ? matches[1] : null;
}