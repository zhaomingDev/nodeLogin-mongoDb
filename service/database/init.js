const mongoose = require('mongoose')
const db = 'mongodb://localhost/freeming211'
const glob = require('glob')
const {resolve} = require('path')


exports.initSchemas = () =>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}

mongoose.Promise =  global.Promise

exports.connect = () => {
    //链接数据库
    mongoose.connect(db)

    let maxNum = 0

    return new Promise((resolve, reject) => {

        //增加数据库监听事件

        //数据库监听断开事件
        mongoose.connection.on('disconnected', (err) => {
            console.log('************数据库已断开***********')
            if(maxNum <=3){
                maxNum ++
                mongoose.connect(db)
            }else{
                reject()
                throw new Error('数据库出现问题,程序无法搞定,请维护')
            }
        })

        //数据库监听链接错误事件
        mongoose.connection.on('error', (err) => {
            console.log('************数据库错误***********')
            if(maxNum <=3){
                maxNum ++
                mongoose.connect(db)
            }else{
                reject(err)
                throw new Error('数据库出现问题,程序无法搞定,请维护')
            }
        })

        //数据库监听打开
        mongoose.connection.once('open', () => {
            console.log('************MongoDB 连接成功***********')
            resolve()
        })

    })
}