const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const model = require('./module')
// 获取数据模型
const User = model.getModel('user')
const Chat = model.getModel('chat')

// 新建app
const app = express()
// 在app外面包了一层http
const server = require('http').Server(app)
const io = require('socket.io')(server)

// 后端监听,io是全局连接的请求
io.on('connection',function(socket){
  console.log("user login")
  // socket是当前连接的请求
  socket.on('sendmsg',function(data){
    console.log('sendmsg',data)
    // 接受到数据后，将数据发送到全局
    const {from,to,msg} = data
    const chatid = [from,to].sort().join('-')
    Chat.create({chatid,from,to,content:msg},function(err,doc){
      console.log("doc",doc)
      io.emit('recvmsg',Object.assign({},doc._doc))
    })
  })

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