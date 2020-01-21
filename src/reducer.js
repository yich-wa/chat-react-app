// 合并所有reducers 并且返回
import { user } from './redux/user.redux.js'
import {combineReducers} from 'redux'

export default combineReducers({ user })