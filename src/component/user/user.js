import React from 'react'
import {Result,List,WhiteSpace,Button,Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux.js'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {logoutSubmit}
  )
class User extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel')},
      { text: '确认', onPress: () => {
        browserCookie.erase('userid')
        // 刷新
        // window.location.href = window.location.href
        this.props.logoutSubmit()
        console.log('ok')} },
    ])
  }

  render(){
    console.log("user信息：",this.props)
    const Item = List.Item
    const Brief = Item.Brief
    const props = this.props
    return this.props.user?(
      <div>
        <Result
          img={<img src={require(`../img/${props.avatar}.png`)} style={{width:60}} alt=""/>}
          title={props.user}
          message={props.type=='boss'? props.company:null}
        />
        <List renderHeader={()=>'简介'}>
          <Item 
            multipleLine
            onClick={this.logOut}
          >
            {props.title} 
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资:{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List onClick={this.logout} >
					<Item >退出登录</Item>
				</List>
      </div>
    ):<Redirect to={props.redirectTo}/>
  }
}
export default User