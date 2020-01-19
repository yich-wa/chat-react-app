const ADD_GUN = '加机关枪'
const REMOVE_GUN = '减机关枪'

// reducer
export function counter(state=10,action){
  // console.log(state)
  switch(action.type){
    case '加机关枪':
      return state+1
    case '减机关枪':
      return state -1
    default:
      return state
  }
}

// action creator
export function addGun(){
  return {type:ADD_GUN}
}

export function removeGun(){
  return {type:REMOVE_GUN}
}
// 模拟异步操作，传入的参数是一个函数dispatch
export function addGunAsync(){
  return dispatch =>{
    setTimeout(()=>{
      dispatch(addGun())
    }, 2000)
  }
}