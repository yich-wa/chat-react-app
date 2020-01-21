import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
class Login extends React.Component{

  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }
  
  register(){
    console.log("login.js**",this.props)
    // 在这个参数中，给了这个路径就：跳转到注册页面，这个是什么逻辑？
    // 它是一个路由组件，所以它的props里面有和路由相关的所有操作。
    this.props.history.push('/register')
  }
  render(){
    return (
      <div>
        <h2>登录页面</h2>
        <Logo></Logo>
        <List>
          <InputItem>用户</InputItem>
          <WhiteSpace/>
          <InputItem>密码</InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
          <Button type='primary'>登录</Button>
          <WhiteSpace/>
          <Button onClick={ this.register } type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login