import React from 'react'
import axios from 'axios'
import {Card, WingBlank, WhiteSpace } from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux.js'
import { connect } from 'react-redux'
import UserCard from '../usercard/usercard.js'
@connect(state=>state.chatuser,
  {getUserList})
class Genius extends React.Component{

  componentDidMount(){
   this.props.getUserList('boss')
  }

  render(){
    // const Header = Card.Header
    // const Body = Card.Body
    // console.log("render",this.props.userlist)
    return <UserCard userlist={this.props.userlist} ></UserCard>
  }
}
export default Genius