const Koa = require('koa');
const cors = require('koa2-cors')
const koaBody = require('koa-body')
const Router = require('./routes')
const app = new Koa();

// 处理跨域
app.use(cors())
app.use(koaBody())
app.use(Router.routes()).use(Router.allowedMethods());



app.listen(8080,()=>{
    console.log("koa listening on port 8080")
});