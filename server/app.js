const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const favicon = require('koa-favicon');
const koaBody = require('koa-body');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const conf = require('./config');
const {srever} = require('./routes/socket');
const cors = require('koa2-cors');
const colors = require('colors');
const { resolve } = require('path');
const fs = require('fs');

const api = require('./routes/api');
const index = require('./routes/index');

// error handler
onerror(app);
// 允许上传文件
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 1000*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
// middlewares
app.use(favicon(__dirname + '/public/favicon.ico'));
// 允许请求格式
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
// 允许跨域
app.use(
    cors({
        origin: function(ctx) {
            return "http://localhost:3001";
        },
        exposeHeaders: ["WWW-Authenticate", "Server-Authorization"],
        maxAge: 3600,
        credentials: true,
        allowMethods: ['GET', 'PUT', 'POST'],
        allowHeaders: ["Content-Type", "Authorization", "Accept"]
    })
);

app.use(json());

// logger
app.use(async (ctx, next) => {
    let logPath = resolve(__dirname, './log', 'log.log');
    let log = '\r\n';

    const start = new Date();
    await next();
    const ms = new Date() - start;

    // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`.red);
    // console.log(JSON.stringify(ctx.request));

    let json = {};
    json.url = ctx.url;
    json.type = ctx.method;
    json.request = ctx.request;
    if (ctx.method === 'GET') {
        json.parm = ctx.query;
    } else {
        json.parm = ctx.request.body;
    }
    json.time = `${ms}ms`;
    json = JSON.stringify(json);
    log += `${new Date().toLocaleString()}\r\n`;
    log += json;
    log += '\r\n';
    fs.writeFile(logPath, log, {'flag': 'a'}, e => {});
});
// koa-logger
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));
// 模板文件
app.use(views(__dirname + '/views', {
    extension: 'pug'
}));

// 加入cookie.get 及 set
app.use(async (ctx, next) => {
    ctx.cookie = {
        set: (k, v, opt) => {
            opt = Object.assign({}, conf.cookieOptions, opt);
            return ctx.cookies.set(k, v, opt);
        },
        get: (k, opt) => {
            opt = Object.assign({}, conf.cookieOptions, opt);
            return ctx.cookies.get(k, opt);
        }
    };
    ctx.DATA = {
        data: {},
        message: '',
        code: 200,
    };
    await next();
});

// routes
app.use(api()); // api
app.use(index.routes(), index.allowedMethods()); // 模板页

// error-handling
app.on('error', (err, ctx) => {
    if(!err.status) err.status = 500;
    console.error('Server Error'.red, err.message, err.status);
    console.error(err);

    let logPath = resolve(__dirname, './log', 'error.log');
    let log = '\r\n';
    let json = {};
    json.url = ctx.url;
    json.type = ctx.method;
    json.request = ctx.request;
    if (ctx.method === 'GET') {
        json.parm = ctx.query;
    } else {
        json.parm = ctx.request.body;
    }
    json.status = err.status;
    json.message = err.message;
    json = JSON.stringify(json);

    log += `${new Date().toLocaleString()}\r\n`;
    log += json;
    log += '\r\n';
    log += err.stack;
    log += '\r\n';
    fs.writeFile(logPath, log, {'flag': 'a'}, e => {});
});

// socket连接
srever(app);

module.exports = app;
