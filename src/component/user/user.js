import React from 'react'
import PropTypes from 'prop-types'
import {Result,List,WhiteSpace,Button,Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import browserCookie from 'browser-cookies'

@connect(state=>state.user)
class User extends React.Component{
  constructor(props){
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout(){
    const alert = Modal.alert
    alert('注销', '确认退出登录吗???', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确认', onPress: () => {
        browserCookie.erase('userid')
        window.location.href = window.location.href
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
          >
            {props.title} 
            {props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
            {props.money?<Brief>薪资:{props.money}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <Button 
          onClick={this.logout}
        >退出登录</Button>
        <WhiteSpace></WhiteSpace>
        <List onClick={this.logout} >
          <Item onClick={this.logout} >退出登录</Item>
        </List>
      </div>
      
    ):null
  }
}
export default User