import React from 'react'
import ReactDom from 'react-dom'
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
import reducers from './reducer.js'
import './config.js'
// import 'antd-mobile/dist/antd-mobile.css'
import Login from './container/login/login.js'
import Register from './container/register/register.js'
import BossInfo from './container/bossinfo/bossinfo.js'
import GeniusInfo from './container/geniusinfo/geniusinfo.js'
import AuthRoute from './component/authroute/authroute.js'
import Dashboard from './component/dashboard/dashboard.js'
import './index.css'

const reduxDevTool = window.devToolsExtension?window.devToolsExtension():f=>f
// 传入reducer:counter
// console.log("index", reducers)
const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  reduxDevTool))
// console.log("index.js中：",store.getState())

// 登录
//   没有登录信息，同一跳转login
// 页面 导航+显示+注销
//   一营
//   二营
//   骑兵连
// function Boss(){
//   return <h1>Boss页面</h1>
// }


// 下面Route路由会有包含关系的一定要加上一个参数exact
// Route中要带参数，加入一个冒号':'
// boss genius me msg 4个页面
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute> 
        <Switch>
          <Route path='/geniusinfo' component={GeniusInfo}></Route>
          <Route path='/bossinfo' component={BossInfo}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/register' component={Register}></Route>
          {/* 前面如果都没有命中的话，就渲染下面这个路由组件 */}
          <Route component={Dashboard}></Route>
        </Switch>
        {/* <Redirect to='/register'></Redirect> */}
      </div>
    </BrowserRouter>
  </Provider>),document.getElementById('root')
)



