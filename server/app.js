const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const favicon = require('koa-favicon')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const conf = require('./config');
const socket = require('./socket');
var cors = require('koa2-cors');
app.use(cors({
    origin: function (ctx) {
        // if (ctx.url === '/test') {
        //     return "*"; // 允许来自所有域名请求
        // }
        return 'http://localhost:3001'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

const index = require('./routes/index')
const users = require('./routes/users')
const api = require('./routes/api')
const multer = require('./routes/multer')

// error handler
onerror(app)

// middlewares
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}));
app.use(json());
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

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
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(multer.routes(), multer.allowedMethods())
app.use(api.routes(), api.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

// socket.srever(app);

module.exports = app
