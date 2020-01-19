import React from 'react'
import ReactDom from 'react-dom'
import App from './App.js'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk  from 'redux-thunk'
import { Provider } from 'react-redux'
import { 
  BrowserRouter, 
  Link, 
  Route,
  Redirect,
  Switch } from 'react-router-dom'
  // Redirect是专门用来跳转的
import { counter }from './index.redux.js'


const reduxDevTool = window.devToolsExtension?window.devToolsExtension():f=>f
// 传入reducer:counter
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  reduxDevTool))

function Erying(){
  return <h2>二营</h2>
}
function Qibinglian(){
  return <h2>骑兵连</h2>
}

class Test extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    console.log(this.props)
    // 利用路由组件中的参数
    return <h2>测试组件{this.props.match.params.location}</h2>
  }
}

// 下面Route路由会有包含关系的一定要加上一个参数exact
// Route中要带参数，加入一个冒号':'
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <ul>
          <li>
            <Link to='/'>一营</Link>
          </li>
          <li>
            <Link to='/erying'>二营</Link>
          </li>
          <li>
            <Link to='/qibinglian'>骑兵连</Link>
          </li>
        </ul>
        <Switch>
          <Route path='/' exact component={App}></Route>
          <Route path='/erying' component={Erying}></Route>
          <Route path='/qibinglian' component={Qibinglian}></Route>
          <Route path='/:location' exact component={Test}></Route>
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>),document.getElementById('root')
)



