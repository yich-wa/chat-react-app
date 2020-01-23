import React from 'react'
import PropTypes from 'prop-types'
import {Card, WingBlank, WhiteSpace } from 'antd-mobile'
import {getUserList} from '../../redux/chatuser.redux.js'
import { connect } from 'react-redux'

@connect(state=>state.chatuser,
  {getUserList})
class UserCard extends React.Component{

  static propTypes = {
    userlist:PropTypes.array.isRequired
  }

  render(){
    const Header = Card.Header
    const Body = Card.Body
    console.log("render",this.props.userlist)
    return (
      <WingBlank>
        {this.props.userlist.map(v=>(
          v.avatar?(<Card key={v._id} full={true}>
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}  
            >
            </Header>
            <Body>
              {v.type=='boss'? <div>公司:{v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type=='boss'? <div>薪资:{v.money}</div>:null}
            </Body>
          </Card>):null
        ))}
      </WingBlank>

    )
  }
}
export default UserCard