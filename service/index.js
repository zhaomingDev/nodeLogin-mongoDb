const Koa = require('koa')
const Router = require('koa-router')
const app = new Koa()

// 连接服务器
const { connect, initSchemas } = require('../service/database/init')
const mongoose = require('mongoose')

//引入不同接口模块
let login = require('./appApi/login')


//跨域
const cors = require('koa2-cors')
app.use(cors())

//用于post拿数据
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//装载子路由
const router = new Router()
//登录模块的
router.use('/login', login.routes())

//加载路由中组件
app
    .use(router.routes())
    .use(router.allowedMethods());

//立即执行函数
; (async () => {
    await connect()
    initSchemas()
})()


app.listen(3000, () => {
    console.log('3000端口已经打开')
})

