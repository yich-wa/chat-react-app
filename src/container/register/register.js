import React from 'react'
import Logo from '../../component/logo/logo.js'
import {List, InputItem,Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import { register } from '../../redux/user.redux.js'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

@connect(state=>state.user,
  { register })
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      type:"genius", // or boss
      user:"",
      pwd:"",
      repeatpwd:"",
    }
    this.handleRegister= this.handleRegister.bind(this)
  }
  // hanleChange和hanleRegister是两种不同的注册方式，一个是箭头函数，一个是普通的函数，普通的函数
  // 需要在constructor里改变this指向
  handleChange(key,value){
    // 指定key，改变相应的key
    this.setState({
      [key]:value
    })
  }

  handleRegister(){
    console.log("handleRegister",this.state)
    this.props.register(this.state)
  }
  

  render(){
    const RadioItem = Radio.RadioItem
    return (
      <div>
        <h2>注册页面</h2>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo}/>:null}
        <Logo></Logo>
        <List>
          {this.props.msg?<p className = "error-msg">{this.props.msg}</p>:null}
          <InputItem
            onChange = {v=>this.handleChange('user',v)}
          >用户名</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange = {v=>this.handleChange('pwd',v)}
          >密码</InputItem>
          <WhiteSpace/>
          <InputItem
            type='password'
            onChange = {v=>this.handleChange('repeatpwd',v)}
          >确认密码</InputItem>
          <WhiteSpace/>
          <RadioItem 
            onChange = {v=>this.handleChange('type','genius')}
            checked={this.state.type=='genius'}>
          Genius 
          </RadioItem>
          <WhiteSpace/>
          <RadioItem  
            onChange = {v=>this.handleChange('type','boss')}
            checked={this.state.type=='boss'}>
          BOSS
          </RadioItem>
          <WhiteSpace/>
          <Button 
            onClick = {this.handleRegister}
            type="primary">注册</Button>
        </List>
      </div>
    )
  }
}
export default Register