import React, {Component} from 'react';
import {NavBar,List,WingBlank,WhiteSpace,InputItem,Radio,Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'

/*登录路由组件*/
export default class Login extends Component{

  //初始化状态
  state = {
    username: "",
    password: "",

  };
  //跳转到注册
  toRegister = () =>{
    this.props.history.replace('/regist')
  };

  //请求登录
  login = () =>{
    console.log(this.state);
  };
  handleChange =(name,val) => {
    this.setState({
      [name]:val
    })
  };
  render(){
    return (
      <div>
        <NavBar>用户登陆</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type='text' placeholder='请输入用户名'
                       onChange={(val) => this.handleChange('username', val)}>用户名: </InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码'
                       onChange={(val) => this.handleChange('password', val)}>密码: </InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;陆</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
