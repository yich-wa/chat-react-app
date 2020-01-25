import React from 'react'
import io from 'socket.io-client'
import { InputItem,List, NavBar} from 'antd-mobile'
import { connect } from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux.js'
const socket = io('ws://localhost:9093')
// 该组件是在usercard组件中点击列表中的某个对象后，弹出与他的对话窗口
// 直接获取所有状态，对组件状态进行分解
@connect(
  state=>state,
  {getMsgList,sendMsg, recvMsg}
)
class Chat extends React.Component{
  constructor(props){
    super(props)
    this.state = {text:'',msg:[]}
  }
  componentDidMount(){
    // redux中管理的函数
    this.props.getMsgList()
    this.props.recvMsg()
  }
  handleSubmit(){
    // 发送完之后，输入框内清空
    console.log("this.props",this.props)
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    console.log("*****handleSubmit****",from,to,msg)
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
    
  }
  render(){
    
    const user = this.props.match.params.user
    const Item = List.Item
    // console.log(user,"this.propps:",this.props)
    return(
      <div id='chat-page'>
        <NavBar mode='dark'>
          {this.props.match.params.user}
        </NavBar>
        <div style={{marginTop:40}}>
          {this.props.chat.chatmsg.map(v=>{
            return v.from==user?(
            <List key={v._id}>
              <Item
                // thumb={}
              >{v.content}</Item>
            </List>
            ):(
              <List key={v._id}>
                <Item 
                  extra={'avatar' }
                  className='chat-me'
                >{v.content}</Item>
              </List>
            )
          })}
        </div>
        
        <div className = "stick-footer">
          <List>
            <InputItem
              placeholder='请输入'
              value = {this.state.text}
              onChange={v=>{
                this.setState({text:v})
              }}
              extra = {<span onClick={()=>this.handleSubmit()}>发送</span>}
            ></InputItem>
          </List>
          {/* <h2>chat with user:{this.props.match.params.user}</h2> */}
        </div>
      </div>
      
    )
  }
}
export default Chat