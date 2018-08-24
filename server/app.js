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
    await next();
});

// logger
app.use(async (ctx, next) => {
    const start = new Date();
    await next();
    const ms = new Date() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
});

// routes
app.use(api()); // api
app.use(index.routes(), index.allowedMethods()); // 模板页

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// socket连接
srever(app);

module.exports = app;
