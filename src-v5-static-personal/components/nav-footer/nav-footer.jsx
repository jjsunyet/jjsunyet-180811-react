import React,{Component}from 'react';
import PropTypes from 'prop-types';
import {TabBar} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

const Item = TabBar.Item;

class NavFooter extends Component{

  render(){
    /*回调函数返回值为true当前值就会留下否则则会被过滤掉*/
    const navList = this.props.navList.filter(nav=>!nav.hide)
  //  当前请求路径
    const {pathname} = this.props.location;
    return(
      /*navList是一个数组，底部导航栏为遍历数组所得*/
      <TabBar>
        {
          /*nav就是item*/
          navList.map((nav,index)=>(
            <Item key = {index}
                  title = {nav.text}
                  icon={{uri:require(`./images/${nav.icon}.png`)}}
                  selectedIcon = {{uri:require(`./images/${nav.icon}-selected.png`)}}
                  selected={pathname===nav.path}
                  onPress={()=>{
                      this.props.history.replace(nav.path)
                    }}
            />


          ))
        }
      </TabBar>
    )
  }
}
export default withRouter(NavFooter);
/*nav是遍历navList所得，而navList中的每一项都有一个path,所以通过nav.path取得path*/