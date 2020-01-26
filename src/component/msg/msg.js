import React from 'react'
import { connect } from 'react-redux'
import {List,Badge} from 'antd-mobile'

@connect(
  state=>state
)
class Msg extends React.Component{
  getLast(arr){
    return arr[arr.length-1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    // 按照聊天用户分组
    const msgGroup={}
    this.props.chat.chatmsg.forEach(v=>{
      msgGroup[v.chatid]=msgGroup[v.chatid]||[]
      msgGroup[v.chatid].push(v)
    })
    // msgGroup是一个以chatid为键的对象集合。
    console.log("this.props",this.props)
    console.log("msgGroup",msgGroup)
    // 抽取里面的值，转化为数组
    const chatList = Object.values(msgGroup).sort((a,b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last-a_last
    })

    const users = this.props.chat.users
    
    return(
      <div>
        <List>
          {chatList.map(v=>{
            const lastItem = this.getLast(v)
            const fromUserid = lastItem.from==userid?lastItem.to:lastItem.from
            const avatar = require(`../img/${users[fromUserid].avatar}.png`)
            const unreadNum = v.filter(d=>!d.read&&d.to==userid).length
            if(!users[fromUserid]){
              return null
            }
            return (
              <List 
                key={lastItem._id}
                // 教程中是将onClick放在了Item上，似乎不太灵，调整了下，放在List上。
                onClick={()=>
                  this.props.history.push(`/chat/${fromUserid}`)
                }>
                <Item
                  
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={avatar}
                  arrow="horizontal"      
                >
                  {lastItem.content}
                  <Brief>{users[fromUserid].name}</Brief>
                  {/* {v[0].from} */}
                </Item>
              </List>
            )
          })}
          
        </List>
      </div>
    )
  }
}

export default Msg