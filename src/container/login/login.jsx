import React, {Component} from 'react';
import {NavBar,List,WingBlank,WhiteSpace,InputItem,Radio,Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'


import Logo from '../../components/logo/logo';
import {login} from '../../redux/actions/actions'

/*登录路由组件*/
class Login extends Component{

  //初始化状态
  state = {
    username: "",
    password: "",

  };
  //跳转到注册
  toRegist = () =>{
    this.props.history.replace('/regist')
  };

  //请求登录
  login = () =>{
    console.log(this.state);
    this.props.login(this.state);
  };
  handleChange =(name,val) => {
    this.setState({
      [name]:val
    })
  };
  render(){
    const {type} = this.state
    const {msg,redirectTo} = this.props.user;
    if(redirectTo){
      console.log(redirectTo)
      return<Redirect to={redirectTo}/>
    //  在render（）中实现自动跳转的路由
    }
    return (
      <div>
        <NavBar>用户登陆</NavBar>
        <Logo/>
        <WingBlank>

          <List>
            <p className='error-msg'>{msg}</p>
            <InputItem type='text' placeholder='请输入用户名'
                       onChange={(val) => this.handleChange('username', val)}>用户名: </InputItem>
            <WhiteSpace/>
            <InputItem type='password' placeholder='请输入密码'
                       onChange={(val) => this.handleChange('password', val)}>密码: </InputItem>
            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegist}>没有账户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {login}
)(Login)

