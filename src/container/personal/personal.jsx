import React,{Component} from 'react';
import {Result,List,WhiteSpace,Button,Modal} from 'antd-mobile'
import {connect} from 'react-redux';
import Cookies from 'js-cookie';

import {resetUser} from '../../redux/actions/actions';

const Item = List.Item;
const Brief =Item.Brief;

class Personal extends Component{

  handleLogout = ()=>{
    Modal.alert('退出','确认退出？',[
      {
        text:'取消',
        onPress:()=>console.log('cancel')
      },
      {
        text:'确认',
        onPress:()=>{
        /*干两件事情：
        * 1.删除cookie中的userid
        * 2.重置redux中的user状态
        * */
        Cookies.remove('userid');
        this.props.resetUser();
        }
      }
    ])
  }

  render(){
    const {
      username,
      header,
      post,
      info,
      salary,
      company} = this.props.user;
    return (
      <div style = {{marginTop:50}}>
        <Result
          img ={<img src= {require(`../../assets/images/${header}.png`)} style={{width:50}} alt="header"/> }
          title={username}
          message={company}
        />
        <List renderHeader={()=>'相关信息'}>
          <Item>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {/*<Brief>薪资：{salary}</Brief>有可能有，也有可能没有*/}
            {salary ? <Brief>薪资: {salary}</Brief>:null}
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Button type='warning' onClick={this.handleLogout}>退出登录</Button>
        </List>
      </div>
    )
  }
}

export default connect(
  state=>({user:state.user}),
  {resetUser}
)(Personal)