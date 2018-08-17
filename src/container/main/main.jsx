import React, {Component} from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import Cookies from 'js-cookie';
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import LaobanInfo from '../laoban-info/laoban-info';
import DashenInfo from '../dashen-info/dashen-info';
import {getRedirectPath} from "../../utils/index";
import {getUser} from '../../redux/actions/actions'

class Main extends Component {
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
    const userid = Cookies.get('userid');
    console.log(userid)
    if (!userid) {
      return <Redirect to='/login'/>
    }
    const {user} = this.props;
    if (!user._id) {
      console.log(user._id);
      return <div>LOADING……</div>
    }
    const path = this.props.location.pathname;
    if(path==='/'){
      return <Redirect to = {getRedirectPath(user.type,user.header)}/>
    }
    if(user.type==='laoban'){
      if(path==='/dashen'){
        return <Redirect to  = '/dashen'/>
      }
      // this.navList[1].hide = true;
    }else{
      if(path==='laoban'){
        return <Redirect to = '/dashen'/>
      }
      // this.navList[0].hide = true;
    }
  /*  const currentNav = this.navList.find((nav,index)=>nav.path === path)*/
    return (
      <div>
      {/*  {currentNav ? <NavBar className = 'fix-top'>{currentNav.title}</NavBar>:null};*/}
        <Switch>
          <Route path='/laobanInfo' component={LaobanInfo}/>
          <Route path='/dashenInfo' component={DashenInfo}/>
        </Switch>
   {/*     {currentNav ? <NavFooter navList={this.navList}/> : null}*/}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {getUser}
)(Main)
