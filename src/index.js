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
// import { counter }from './index.redux.js'
import reducers from './reducer.js'
import Dashboard from './Dashboard.js'
import Auth from './Auth.js'


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


// 下面Route路由会有包含关系的一定要加上一个参数exact
// Route中要带参数，加入一个冒号':'
ReactDom.render(
  (<Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact component={Auth}></Route>
        <Route path='/dashboard' component={Dashboard}></Route>
        <Redirect to='/dashboard'></Redirect>
      </Switch>
    </BrowserRouter>
  </Provider>),document.getElementById('root')
)



