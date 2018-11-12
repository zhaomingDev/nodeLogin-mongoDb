const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
// 调用数据库
const mongoose = require('mongoose')
// 调用token
const jwt = require('jsonwebtoken')


//注册用户
router.post('/register', async (ctx, next) => {
    try {
        let postData = ctx.request.body;
        const User = mongoose.model('User')

        let result = await User.find({ userName: postData.user.userName }).exec()
        if (result == '') {
            //放入建模,建模的js在下面
            let newGoods = new User(postData.user)
            newGoods.save().then(() => {
                console.log('创建成功')
            }).catch(error => {
                console.log('失败：' + error)
            })
            return ctx.body = {
                code: 200,
                data: '添加成功'
            }
        } else {
            return ctx.body = {
                code: 201,
                data: '账户已存在'
            }
        }

    } catch (error) {
        return ctx.body = {
            code: 500,
            message: error
        }
    }

});


//登录
router.post('/login', async (ctx, next) => {
    try {
        let postData = ctx.request.body;
        const User = mongoose.model('User')

        /**
         *  result 查出的是具体的数值
         *  例如:
         * {
         *  id:xxxx
         *  name:xxxx
         *  password:xxx
         * }
         */
        let result = await User.findOne({ userName: postData.user.userName, password: postData.user.password }).exec()

        if (result !== null) {
            const token = jwt.sign({
                userName: result.userName,
                _id: result._id
            }, 'my_token', { expiresIn: '1h' });

            // await User.updateOne({ _id: result._id }, { token: token })
            await User.updateOne({ _id: result._id }, {$set:{ token: token }},{multi:true})

            return ctx.body = {
                code: 200,
                token: token,
                data: '登录成功'
            }
        } else {
            return ctx.body = {
                code: 201,
                data: '账号或密码错误'
            }
        }

    } catch (error) {
        return ctx.body = {
            code: 500,
            message: error
        }
    }
});


//检测token
//api.js
router.post('/checkUser', async (ctx, next) => {
    try {
        let postData = ctx.request.body;
        const User = mongoose.model('User')
        let result = await User.findOne({ userName: postData.userName,token:postData.token}).exec()
        if(result !=null){
            let token = postData.token; // 从body中获取token
            jwt.verify(token, 'my_token', (err, decode)=> {
                console.log(err)
                console.log(decode)
                if (err) {  //  时间失效的时候/ 伪造的token  
                    return ctx.body = {
                        code: 201,
                        status: 0
                    }                 
                } else {
                    return ctx.body = {
                        code: 200,
                        status: 1
                    } 
                }
            })
        }else{
            return ctx.body = {
                code: 202,
                data:'登录失败'
            } 
        }
    } catch (error) {
        return ctx.body = {
            code: 500,
            message: error
        }
    }

})

router.get('/forget', async (ctx, next) => {
    ctx.body = "这是忘记密码";
});


module.exports = router;
