// import Register from "../container/register/register"
import axios from "axios"
import { getRedirectPath} from "../util.js"

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState={
  // 表明是否已经登录
  redirectTo:'',
  // isAuth:'false',
  // 表明错误信息
  msg:'',
  user:'',
  // pwd:'',
  type:'genius'
}
// reducer
export function user(state=initState, action){
  switch (action.type){
    case AUTH_SUCCESS:
      return {...state,msg:"", redirectTo:getRedirectPath(action.payload),...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth:false, msg:action.msg}
    default:
      return state
  }
}

// payload是一种负载，常见写法
function authSuccess(data){
  return { type:AUTH_SUCCESS, payload:data }
}

export function update(data){
  // console.log("update中的：",data)
  return dispatch=>{
    axios.post('/user/update',data)
      .then(res=>{
        if(res.status==200&&res.data.code===0){
          // res.data.data是后端返回给我们的信息
          // console.log("后端返回的数据",res.data,res.data.data)
           dispatch(authSuccess(res.data.data))
        }else{
           dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
function errorMsg(msg){
  return {msg, type:ERROR_MSG}
}

export function loadData(data){
  return {type:LOAD_DATA, payload:data}
}

export function login({user, pwd}){
  console.log("login函数里面：",{user, pwd})
  if(!user||!pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  // 下面这个是异步的,异步信息都要借助dispatch作为参数的函数来发布
  return dispatch=>{
    axios.post('/user/login',{user,pwd})
      .then(res=>{
        if(res.status==200&&res.data.code===0){
          // res.data.data是后端返回给我们的信息
          console.log("后端返回的数据",res.data,res.data.data)
           dispatch(authSuccess(res.data.data))
        }else{
           dispatch(errorMsg(res.data.msg))
        }
      })
  }
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
           dispatch(authSuccess({user,pwd,type}))
        }else{
           dispatch(errorMsg(res.data.msg))
        }
      })
  }
}