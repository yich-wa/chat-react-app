const express = require('express')
const mongoose = require('mongoose')
// 链接mongo 并且使用imooc 这个集合
const DB_URL = 'mongodb://localhost:27017/imooc'
mongoose.connect(DB_URL)
mongoose.connection.on('connected',function(){
  console.log('mongo connect success')
})
// 类似于mysql的表，mongo里有文档、字段的概念
const User = mongoose.model('user',new mongoose.Schema({
  user:{type:String,require:true},
  age:{type:Number,require:true}
}))
// 新增数据
User.create({
  user:'WaYiCh',
  age:23
},function(err,doc){
  if(!err){
    console.log(doc)
  }else{
    console.log(err)
  }
})
// 删除指定条件的数据：
// User.remove({age:18},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })
// 更新mongodb数据
// User.update({'user':'WaYiCh'},{'$set':{age:26}},function(err,doc){
//   if(!err){
//     console.log(doc)
//   }
// })

// 新建app
const app = express()

// 查找mongodb数据
// 查找所有
app.get('/find',function(req,res){
  User.find({},function(err,doc){
    res.json(doc)
  })
})
app.get('/data',function(req,res){
  User.findOne({user:'WaYiCh'},function(err,doc){
    res.json(doc)
  })
})
// // 查找指定数据
// app.get('/find',function(req,res){
//   User.find({'age':26},function(err,doc){
//     res.json(doc)
//   })
// })
// // 只查找一条
// app.get('/find',function(req,res){
//   User.findOne({},function(err,doc){
//     res.json(doc)
//   })
// })


app.listen(9093,function(){
  console.log('Node app start at port 9093')
})

// 
app.get('/',function(req,res){
  res.send('<h1>hello world, be patient ! </h1>')
})
// app.get('/data',function(req,res){
//   res.json({name:'imooc',type:'IT'})
// })