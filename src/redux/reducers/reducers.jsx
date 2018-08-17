//reducer的包裹集合
import {combineReducers} from 'redux';
import {getRedirectPath} from "../../utils";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER
} from '../action-types/action-types'

const initUser = {
  username:'',
  type:'',
  msg:'',
  redirectTo:''
};
function user(state = initUser,action) {
  switch (action.type){
    //认证成功，（包括注册成功和校验成功和登陆成功，三种）
    case  AUTH_SUCCESS:
      const user = action.data;
      //返回用户信息，并跳转到一个新的页面
      return {...user,redirectTo:getRedirectPath(user.type,user.header)};
    case ERROR_MSG:
      const msg = action.data;
      return{...state,msg};
    case RECEIVE_USER:
      return action.data;
    case RESET_USER:
      return {...initUser,msg:action.data};
    default:
      return state
  }
}
const initUserList = [];
function userList(state = initUserList,action) {
  switch (action.type){
    /*case RECEIVE_USER_LIST:
      return action.data;*/
    default:
      return state
  }
}
export default  combineReducers({user,userList})
/*
* 1.向外暴露是一个整合后的reducer函数,格式为：function (state,action)
* 2.state的结构为 ： {fun1：fun（），fun2: fun2（）}
* 也即属性值是这两个函数执行后的结果
* */