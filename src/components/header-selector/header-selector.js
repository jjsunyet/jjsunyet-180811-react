/*
* 选择头像的组件
* */
import React,{Component} from 'react';
import {Grid,List} from 'antd-mobile';
import  PropTypes from 'prop-types';

export default class HeaderSelector extends Component{
  /*定义接收数据类型*/
  static propTypes = {
    setHeader:PropTypes.func.isRequired
  }


  /*
  * 初始化状态
  * */
  state = {
    icon:null
  };
  /*
  * 选择头像的函数
  * */
  selectHeader = ({icon,text}) =>{
    /*更新当前组件的状态*/
    this.setState({icon});
    /*更新父组件的状态*/
    this.props.setHeader(text);
  }

  /*
  * 遍历产生state
  * */
  constructor(props){
    super(props);
    this.headerList = [];
    for(let i=0;i<20;i++){
      const text = `头像${i+1}`;
      this.headerList.push({text,icon:require(`../../assets/images/${text}.png`)})
    }
  }


  render(){
    /*计算头部显示*/
    const {icon} = this.state;
    const head = icon ? <p>已选择头像:<img src={icon} alt="headIcon"/></p>:'选择头像才可以继续操作'
    return (
        <List renderHeader={()=>head}>
          <Grid data = {this.headerList}
                 columnNum={5}
                 onClick = {this.selectHeader}>
          </Grid>
        </List>
    )

  }
}
