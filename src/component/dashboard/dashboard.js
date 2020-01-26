import React from 'react'
import {connect} from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink.js'
import Boss from '../../component/boss/boss.js'
import Genius from '../../component/genius/genius.js'
import Msg from '../../component/msg/msg.js'
import User from '../user/user.js'
import {getMsgList,recvMsg} from '../../redux/chat.redux.js'

// function Msg(){
//   return <h2>消息列表页面</h2>
// }
// @withRouter
@connect(
  state=>state,
  {getMsgList,recvMsg}
)
class Dashboard extends React.Component{

  componentDidMount(){
    // redux中管理的函数
    if(!this.props.chat.chatmsg.length){
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  render(){
    // console.log("dashboard",this.props)
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path:'/boss',
        text:'牛人',
        icon:'boss',
        title:'牛人列表',
        component:Boss,
        hide:user.type=='genius'
      },
      {
        path:'/genius',
        text:'boss',
        icon:'job',
        title:'BOSS列表',
        component:Genius,
        hide:user.type=='boss'
      },
      {
        path:'/msg',
        text:'消息',
        icon:'msg',
        title:'消息列表',
        component:Msg
      },
      {
        path:'/me',
        text:'我',
        icon:'user',
        title:'个人中心',
        component:User,
      }
    ]
    // console.log("navlist",navList)
    return (
      
      <div>
        <NavBar className='fixed-header' mode='dark'>{navList.find(v=>v.path==pathname).title}</NavBar>
        <h2>content</h2>
        <div style={{marginTop:25}}>
          <Switch>
            {navList.map(v=>(
              <Route key={v.path} path={v.path} component={v.component}/>
            ))
            }
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard