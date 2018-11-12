const mongoose = require('mongoose')    //引入Mongoose
const Schema = mongoose.Schema          //声明Schema
let ObjectId = Schema.Types.ObjectId    //声明Object类型

//创建我们的用户Schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: { unique: true, type: String },
    password: String,
    phone : String,
    email  : String,
    token:String
})

//发布模型
//红色加粗的对应上,起一个叫User的，对应userSchema数据

mongoose.model('User', userSchema)