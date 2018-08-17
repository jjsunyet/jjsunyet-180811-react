import React,{Component} from 'react';
import {NavBar,Button,InputItem,TextareaItem} from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';

import HeaderSelector from '../../components/header-selector/header-selector';
import {updateUser} from "../../redux/actions/actions";


/*
* 大神信息完善路由组件
* */
class DashenInfo extends Component{
  /*初始化数据*/
  state={
    header:'',
    info:'',
    post:''
  };
  setHeader = (header)=>{
    this.setState({header})
  };

  handleChange=(name,val)=>{
    this.setState({[name]:val})
  };


  render (){
      const {header} = this.props.user;
      // const {user} = this.props;
      if(header){
        return <Redirect to='/dashen'/>
      }
      return(
        <div>
            <NavBar>sharpGuy</NavBar>
            <HeaderSelector setHeader={this.setHeader}/>
            <InputItem onChange={val=>{this.handleChange('post',val)}}>求职岗位：</InputItem>/>
            <TextareaItem
              title='技术类型：'
              rows = {3}
              onChange={val=>{this.handleChange('info',val)}}/>
            <Button type='primary' onClick ={()=>this.props.updateUser(this.state)}>点击提交</Button>
        </div>
    )
  }
}
export default connect(
  state=>({user:state.user}),
  {updateUser:updateUser}
)(DashenInfo)