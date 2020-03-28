const Router = require("koa-router")
const mysql = require('./mysql')


let router = new Router()


router.post('/api/register', async (ctx, next) => {
    try{
        let data = ctx.request.body

        let user1 = await mysql.query(`select * from user where userName="${data.user}"`)
        user1=JSON.parse(JSON.stringify(user1))
        if (user1[0]){ return ctx.body={ msg:'用户名已存在！',code:1 } }

        let user2 = await mysql.query(`select * from user where email="${data.eMail}"`)
        user2=JSON.parse(JSON.stringify(user2))
        if (user2[0]){ return ctx.body={ msg:'该邮箱已被注册！',code:1 } }

        //正经应用密码需要加密的哈
        await mysql.query(`insert into user (userName,pwd,email,faceData) values ('${data.user}','${data.pwd}','${data.eMail}','${0}')`)
        ctx.status = 201
        return ctx.body={user:data.user,code:0}
    }catch (e) {
        console.log(e)
        return ctx.body={
            code:1,
            msg:"数据入库失败！请稍候再试！"
        }
    }


})
router.get('/api/login',async (ctx, next) => {
    try{
        let params = ctx.query
        let user1 = await mysql.query(`select * from user where userName="${params.user}" and pwd="${params.pwd}"`)
        user1=JSON.parse(JSON.stringify(user1))
        if(!user1[0]){ return ctx.body={code:1,msg:"用户名或密码错误"}}
        return ctx.body = {
            code:0,
            haveFaceData:parseInt(user1[0].faceData),
            user:user1[0].userName
        }
    }catch (e) {
        console.log(e)
        return ctx.body={
            code:1,
            msg:"数据入库失败！请稍候再试！"
        }
    }


})

module.exports=router