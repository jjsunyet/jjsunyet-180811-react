import React, {Component} from 'react';
import {Button} from 'antd-mobile'

export default class Main extends Component{
  render(){
    return (
      <div>
        <Button type='primary'>登录</Button>
        <div><br/></div>
        <Button type='primary'>创建一个新账号</Button>
      </div>
    )
  }
}
