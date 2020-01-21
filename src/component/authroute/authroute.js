import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

@withRouter
class AuthRoute extends React.Component{
  constructor(props){
    super(props)
  }
  // 下面这个是Mount不是Mound刚写错了
  componentDidMount(){
    const publicList = ['/login','/register']
    const pathname = this.props.location.pathname
    if(publicList.indexOf(pathname)>-1){
      return null
    }
    // 获取用户信息
    // .then的写法其实是：promise的写法,会返回东西
    axios.get('/user/info').
      then(res=>{
        // console.log("res",res)
        if(res.status==200) {
          if(res.data.code==0){
            // 有登录信息的
          }else{
            // console.log(this.props.history)
            this.props.history.push('/login')
          }
        }  
      })
    // 是否登录
    // 现在的url地址 login是不需要跳转的
    // 用户的type 身份是boss还是genius
    // 用户是否完善信息（选择头像、个人简介）

  }
  render(){
    return (
      <p>判断调试</p>
    )
  }
}
export default AuthRoute