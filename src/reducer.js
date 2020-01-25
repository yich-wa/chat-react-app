// 合并所有reducers 并且返回
import { user } from './redux/user.redux.js'
import { chatuser } from './redux/chatuser.redux.js'
import { chat } from './redux/chat.redux.js'
import {combineReducers} from 'redux'

export default combineReducers({ user,chatuser, chat})