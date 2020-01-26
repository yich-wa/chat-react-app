const express = require('express')
const Router = express.Router()
const model = require('./module')
// 获取数据模型
const User = model.getModel('user')
const Chat = model.getModel('chat')
const utils = require('utility')
const _filter = {'pwd':0,'__v':0}

// 清空聊天信息，
// Chat.remove({},function(req,res){

// })

// 如果前端是get-list，那么给它返回什么信息
Router.get('/list',function(req,res){
  // User.remove({},function(err,doc){})
  const {type} = req.query
  User.find({type},function(err,doc){
    // 得到的数据必须通过下面这个方式去返回。
    return res.json({code:0,data:doc})
  })
})

Router.get('/getmsglist',function(req,res){
  const user = req.cookies.userid
  User.find({},function(e,userdoc){
    let users={}
    userdoc.forEach(v=>{
      users[v._id] = {name:v.user, avatar:v.avatar}
    })
    // 
    Chat.find({'$or':[{from:user},{to:user}]},function(err,doc){
      if(!err){
        return res.json({code:0,msgs:doc,users:users})
      }
    })
  })
  
})

Router.post('/readmsg',function(req,res){
  const userid = req.cookies.userid
  // console.log("req",req)
  const {from} = req.body
  console.log("readmsg",userid,from)
  // 更新，共计4个参数，第一个条件是更新范围，第二个是数据更新设置
  Chat.updateMany(
    {from,to:userid},// 过滤条件
    {'$set':{read:true}}, // 更新数据
    // {'multi':true}, // 是否更新所有
    function(err,doc){    // 回调函数
    console.log("doc",doc) // doc {n:1, nModified:1, ok:1}
    if(!err){
      return res.json({code:0,num:doc.nModified})
    }
    return res.json({code:1,msg:'修改失败'})
  })
})

Router.post('/update',function(req,res){
  const userid = req.cookies.userid
  if(!userid){
    return res.json.dumps({code:1})
  }
  const body = req.body
  // console.log("后端update",body);
  User.findByIdAndUpdate(userid,body,function(err,doc){
    const data = Object.assign({},{
      user:doc.user,
      type:doc.type
    },body)
    return res.json({code:0,data})
  })
})
// 登录信息校验
Router.post('/login',function(req,res){
  // console.log("post",req.body)
  const {user,pwd} = req.body
  // 第一个是登陆条件，第二个是显示条件，将返回的密码数据显示为0
  User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
    if(!doc){
      // 库中没有找到用户名和密码符合的用户
      return res.json({code:1,msg:'用户名或者密码错误'})
    }else{
      // 找到对应的用户，登录成功
      // 写入cookie中
      res.cookie('userid',doc._id)
      return res.json({code:0,data:doc})
    }
  })
}) 

// 注册信息入库
Router.post('/register',function(req,res){
  console.log("post",req.body)
  const {user,pwd,type} = req.body
  User.findOne({user},function(err,doc){
    if(doc){
      // 库中存在该用户名的用户
      return res.json({code:1,msg:'用户名重复'})
    }
    // 创建该用户,用该方法没办法取得其中的userid，
    // 得用userModel.save,这样才可以取得其中的_id,使用它写入cookie中
    const userModel = new User({user,type,pwd:md5Pwd(pwd)})
    userModel.save(function(e,d){
      if(e){
        return res.json({code:1,msg:'后端出错了'})
      }
      const {user,type,_id} = d
      res.cookie('userid',_id)
      // 注册的时候也需要写cookie
      return res.json({code:0,data:{user,type,_id}})
    })
  })
})
Router.get('/info',function(req,res){
  // 用户有没有cookie
  // 尝试读取cookie,在request中
  console.log("getInfo,",req.cookies)
  const {userid} = req.cookies
  console.log("userId",userid)
  // 没有读到cookie
  if(!userid){
    return res.json({code:1})
  }
  // 成功从cookie中读到userid
  // 查询相关信息，也可以使用findById
  User.findOne({_id:userid},_filter,function(err,doc){
    if(err){
      return res.json({code:1,msg:'后端出错了'})
    }
    if(doc){
      return res.json({code:0,data:doc})
    }
  })
})  

function md5Pwd(pwd){
  // 给密码加点盐
  let salt = '232323`1232/.,nm'
  return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router