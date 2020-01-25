import React from 'react'
import PropTypes from 'prop-types'
// import { TarBar } from 'antd-mobile'
import { TabBar } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

@withRouter
@connect(
  state=>state.chat,
)
class NavLinkBar extends React.Component{

  static propTypes = {
    data:PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(v=>!v.hide)
    // console.log("navlist",navList)
    const { pathname } = this.props.location
    return (
      <TabBar>
        {navList.map(v=>(
          <TabBar.Item
            badge={v.text=='消息'?this.props.unread:null}
            key={v.path}
            title={v.text}
            icon = {{uri: require(`./img/${v.icon}.png`)}}
            selectedIcon = {{uri: require(`./img/${v.icon}-active.png`)}}
            selected={pathname==v.path}
            onPress={()=>{
              this.props.history.push(v.path)
            }}
          >

          </TabBar.Item>
        ))}
      </TabBar>
    ) 
  }

}
export default NavLinkBar