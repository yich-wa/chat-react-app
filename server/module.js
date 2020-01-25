// 操作数据库，是一个模型概念

const mongoose = require('mongoose')
// 链接mongo 并且使用imooc 这个集合
const DB_URL = 'mongodb://localhost:27017/chat-react'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('mongo connect success')
})
// // 类似于mysql的表，mongo里有文档、字段的概念
// const User = mongoose.model('user',new mongoose.Schema({
//   user:{type:String,require:true},
//   age:{type:Number,require:true}
// }))

// 建立数据模型
const models = {
  user:{
    'user':{'type':String, 'require':true},
    'pwd':{'type':String, 'require':true},
    'type':{'type':String,'require':true}, 
    // 头像
    'avatar':{'type':String},
    // 个人简介或者职位简介
    'desc':{'type':String,'require':true},
    // 职位名
    'title':{'type':String},
    'company':{'type':String},
    'money':{'type':String}

  },
  chat:{
    'chatId':{'type':String, require:true},
    'from':{type:String,require:true},
    'to':{type:String,require:true},
    'content':{type:String,require:true,default:''},
    'read':{'type':Boolean,default:false},
    'create_time':{type:Number,default:new Date().getTime()}
  }
}

// for...in遍历对象
// mongoose建表
for(let m in models){
  mongoose.model(m,new mongoose.Schema(models[m]))
}

// 导出一个获取表的函数(输入表名，输出表)
module.exports = {
  getModel:function(name){
    return mongoose.model(name)
  }
}