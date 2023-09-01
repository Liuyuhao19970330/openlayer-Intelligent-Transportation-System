const Koa = require('koa');
const cors = require('koa2-cors');  
const bodyparser = require('koa-bodyparser');
const { koaBody } = require('koa-body');
const userRouter = require('../router/user.route');

const app = new Koa();
app.use(cors());
app.use(koaBody());
app.use(bodyparser());

app.use(userRouter.routes());

// 错误处理中间件

module.exports = app;
