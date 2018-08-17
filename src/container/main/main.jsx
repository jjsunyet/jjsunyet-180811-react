import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import Laoban from '../laoban/laoban'
import Dashen from '../dashen/dashen'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
// import Chat from '../chat/chat'

import {getRedirectPath} from "../../utils/index";
import {getUser} from '../../redux/actions/actions'

class Main extends Component {
  navList = [
    {
      path:'/laoban',/*路由路径*/
      component:Laoban,
      title:'大神列表',
      icon:'dashen',
      text:'大神'
    },
    {
      path:'/dashen',/*路由路径*/
      component:Dashen,
      title:'大神列表',
      icon:'laoban',
      text:'老板'
    },
    {
      path:'/message',/*路由路径*/
      component:Message,
      title:'消息列表',
      icon:'message',
      text:'消息'
    },
    {
      path:'/personal',/*路由路径*/
      component:Personal,
      title:'个人中心',
      icon:'personal',
      text:'我的'
    },
    ];
  /*
  * 两种情况：1.cookie中没有userid说明，当前没有登录，则直接跳转到登录页面去。
  *           2.cookie中有userid，但是未完善信息，则直接跳转到登录页面
  * */
  componentDidMount() {
    const userid = Cookies.get('userid');
    const {user} = this.props;
    if (userid && !user._id) {
      this.props.getUser();
    }
  }

  render() {
    //判断用户是否已经登录（也即判断cookie中的userid是否有值）
    const userid = Cookies.get('userid');
    if (!userid) {
      return <Redirect to='/login'/>
    }
    const {user} = this.props;
    if (!user._id) {
      return <div>LOADING……</div>
    }
    //得到当前请求的path
    const path = this.props.location.pathname;
    if(path==='/'){
      return <Redirect to = {getRedirectPath(user.type,user.header)}/>
    }
    /*用户类型是laoban,如果请求的将是dashen列表,也即当前请求的路径是dashen，
    * 应该显示的页面是大神列表，所以把dashen组件设为隐藏
    * */
    if(user.type==='laoban'){
      if(path==='/dashen'){
        return <Redirect to  = '/dashen'/>
      }
      this.navList[1].hide = true;
    }else{
      if(path==='laoban'){
        return <Redirect to = '/dashen'/>
      }
      this.navList[0].hide = true;
    }
    const currentNav = this.navList.find((nav,index)=>nav.path === path)
    return (
      <div>
        {currentNav ? <NavBar className = 'fix-top'>{currentNav.title}</NavBar>:null};
        <Switch>
          <Route path='/laobanInfo' component={LaobanInfo}/>
          <Route path='/dashenInfo' component={DashenInfo}/>

          <Route path='/laoban' component={Laoban}/>
          <Route path='/dashen' component={Dashen}/>
          <Route path='/message' component={Message}/>
          <Route path='/personal' component={Personal}/>
          {/*<Route path='/chat/:userid' component={Chat}/>*/}

          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={this.navList}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)
