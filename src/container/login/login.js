import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { login } from '../../redux/user.redux.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import chatForm from '../../component/chat-form/chat-form.js' 

@connect(state=>state.user,
  {login}
  )
@chatForm
class Login extends React.Component{

  constructor(props) {
    super(props)
    // this.state={
    //   type:"",
    //   user:"",
    //   pwd:""
    // }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  // handleChange 被高阶组件chatForm功能兼并了。
  // handleChange没有用到this，因此不需要在constructor里面进行绑定
  handleChange(key,value){
    // 指定key，改变相应的key
    this.setState({
      [key]:value
    })
  }

  handleLogin(){
    console.log("handleLogin",this.state)
    this.props.login(this.props.state)
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
        {this.props.redirectTo&&(this.props.redirectTo!='/login') ? <Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className = "error-msg">{this.props.msg}</p>:null}
          <InputItem
            onChange = {v=>this.props.handleChange('user',v)}
          >用户</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange = {v=>this.props.handleChange('pwd',v)}
          >密码</InputItem>
        </List>
        <WhiteSpace/>
        <WingBlank>
          <Button 
            type='primary'
            onClick = {this.handleLogin}
          >登录</Button>
          <WhiteSpace/>
          <Button onClick={ this.register } type='primary'>注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login