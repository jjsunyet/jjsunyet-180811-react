import React,{Component} from 'react';
import {Result,List,WhiteSpace,Button} from 'antd-mobile'

const Item = List.Item;
const Brief =Item.Brief;

export default class Personal extends Component{
  render(){
    return (
      <div>
        <Result
          img ={<img src= {require(`../../assets/images/头像1.png`)} style={{width:50}} alt="header"/> }
          title='张云雷'
          message='德云社'
        />
        <List renderHeader={()=>'相关信息'}>
          <Item>
            <Brief>职位：德云八队队长</Brief>
            <Brief>简介：1993.1.11/185/120</Brief>
            <Brief>薪资：200w</Brief>
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning'>退出登录</Button>
        </List>
      </div>
    )
  }
}