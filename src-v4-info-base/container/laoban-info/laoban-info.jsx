import React,{Component} from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile'
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from '../../redux/actions/actions';

/*
* 大神信息完善路由组件
* */
class LaobanInfo extends Component{
  state={
    header:'',
    info:'',
    post:'',
    company:'',
    salary:''

  };
  handleChange=(name,val)=>{
    this.setState({[name]:val})
  };

  //设置更新header
  setHeader = (header)=>{
    this.setState({header});
  };
  render(){
    const {header} = this.props.user;
    // const {user} = this.props;
    /*如果用户信息已完善，自动跳转到laoban主页面*/
    if(header){
      return <Redirect to='/laoban'/>
    }
    return(
      <div>
            <NavBar>BossVerify</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            {/*因为如果单独监测收集这五个值，将会大大增加代码量，所以同步采用一个方法处理*/}
            <TextareaItem
              title='职位要求：'
              rows={3}
              onChange={val=>this.handleChange('info',val)}/>
            <InputItem onChange={val=>this.handleChange('post',val)}>招聘职位：</InputItem>
            <InputItem onChange={val=>this.handleChange('company',val)}>公司名称：</InputItem>
            <InputItem onChange={val=>this.handleChange('salary',val)}>职位薪资</InputItem>
            <Button type='primary' onClick={()=>this.props.updateUser(this.state)}>点击提交</Button>
      </div>
    )
  }





}
export default connect(
  state=>({user:state.user}),
  {updateUser:updateUser}/*传给ui组件不是异步action函数自身，而是包含
                          分发异步action的一个新的函数。
                          */
)(LaobanInfo)