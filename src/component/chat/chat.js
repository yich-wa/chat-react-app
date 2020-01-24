import React from 'react'
import io from 'socket.io-client'
// 该组件是在usercard组件中点击列表中的某个对象后，弹出与他的对话窗口
class Chat extends React.Component{
  componentDidMount(){
    const socket = io('ws://localhost:9093')
    console.log("socket",socket)
  }
  render(){
    console.log("chat",this.props)
    return(
      <h2>chat with user:{this.props.match.params.user}</h2>
    )
  }

}
export default Chat