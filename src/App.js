import React from 'react'
import { addGun, removeGun, addGunAsync} from './index.redux'
import { connect } from 'react-redux'

// 将所有的action塞到props里面,这些操作自动就有dispatch功能
const actionCreators = { addGun, removeGun, addGunAsync}

// connect是使用装饰器模式来写的，是一个高阶组件，接受一个组件吐出另一个组件
@connect(
  state=>({num:state.counter}), 
  actionCreators
)

// 下面这个组件其实是一个dump组件了，只依赖传入的props，可以单独抽离出来
class App extends React.Component{
  render(){
    // console.log("app.js",this.props);
    return (
      // 整个应用需要外层的div包裹
      <div>
        <h1>现在有机关枪{this.props.num}把</h1>
        <button onClick = {this.props.addGun}>添加机枪</button>
        <button onClick = {this.props.removeGun}>上缴机枪</button>
        <button onClick = {this.props.addGunAsync}>等两天再发机枪</button>
      </div>
    )
  }
}
export default App