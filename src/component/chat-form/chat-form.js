import React from 'react'

// 高阶组件，类似于装饰器模式
export default function chatFrom(Comp){
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state={}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key,val){
      console.log("key,val",key,val)
      this.setState({
        [key]:val
      }) 
    }
    render(){
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }        
}