const express = require('express')
const Router = express.Router()
const model = require('./module')
const User = model.getModel('user')
const utils = require('utility')


// 如果前端是get-list，那么给它返回什么信息
Router.get('/list',function(req,res){
  User.find({},function(err,doc){
    return res.json(doc)
  })
})

Router.post('/register',function(req,res){
  console.log("post",req.body)
  const {user,pwd,type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      // 库中存在该用户名的用户
      return res.json({code:1,msg:'用户名重复'})
    }
    // 创建该用户
    User.create({user,pwd:md5Pwd(pwd),type},function(err,doc){
      if(err){
        return res.json({code:1,msg:'后端出错了'})
      }
      // 将信息写到cookie中

      // code是0表示:注册成功
      return res.json({code:0})
      
    })
  })
})
Router.get('/info',function(req,res){
  // 用户有没有cookie
  return res.json({code:1})
})  

function md5Pwd(pwd){
  let salt = '232323`1232/.,nm'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router