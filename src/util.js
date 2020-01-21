// import { user } from "./redux/user.redux";


// 该函数是纯函数，根据信息，决定跳转
export function getRedirectPath({type,avatar }){
  // 根据用户信息 、和信息是否完善，决定返回跳转地址
  // user.type /boss /genius
  // user.avatar /bossinfo /geniusinfo
  let url = (type==='boss')? '/boss' : '/genius'
  if(!avatar){
    url+='info'
  }
  return url
}