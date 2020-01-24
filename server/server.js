const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
// 新建app
const app = express()
// 在app外面包了一层http
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection',function(socket){
  console.log("user login")
})
app.use(cookieParser())

// 使其可以解析post过来的json
app.use(bodyParser.json())

// 开启一个中间件，
// 入口目录设置一个前缀，子目录是由userRouter规定的
app.use('/user', userRouter)

server.listen(9093,function(){
  console.log('Node app start at port 9093')
})