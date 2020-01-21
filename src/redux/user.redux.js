// import Register from "../container/register/register"
import axios from "axios"
import { getRedirectPath} from "../util.js"

const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'

const initState={
  // 表明是否已经登录
  redirectTo:'',
  isAuth:'false',
  // 表明错误信息
  msg:'',
  user:'',
  pwd:'',
  type:'genius'
}
// reducer
export function user(state=initState, action){
  switch (action.type){
    case REGISTER_SUCCESS:
      return {...state, isAuth:true,msg:"", redirectTo:getRedirectPath(action.payload),...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}

// payload是一种负载，常见写法
function registerSuccess(data){
  return { type:REGISTER_SUCCESS, payload:data }
}

function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

export function register({user, pwd, repeatpwd, type}){
  // 上面两个是同步的
  console.log("register函数里面：",{user, pwd, repeatpwd, type})
  if(!user||!pwd||!type) {
    
    return errorMsg('用户名密码必须输入')
  }
  if(pwd!==repeatpwd){
    return errorMsg('密码和确认密码不同')
  }

  // 下面这个是异步的,异步信息都要借助dispatch作为参数的函数来发布
  return dispatch=>{
    axios.post('/user/register',{user,pwd,type})
      .then(res=>{
        if(res.status==200&&res.data.code===0){
           dispatch(registerSuccess({user,pwd,type}))
        }else{
           dispatch(errorMsg(res.data.msg))
        }
      })
  }
}