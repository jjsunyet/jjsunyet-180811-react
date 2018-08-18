import {reqRegist,reqLogin,reqUpdateUser,reqUser} from "../../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RESET_USER,
  RECEIVE_USER
} from '../action-types/action-types';


/*
* 1.注册登录的同步action
* 2.显示错误信息的同步action
*
* */
const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});
const errorMsg = (msg) =>({type:ERROR_MSG,data:msg});
const receiveUser = (user)=>({type:RECEIVE_USER,data:user});
const resetUser = (user) =>({type:RESET_USER,data:user});

/*表单验证*/
/*注册的异步*/
export function regist({username,password,password2,type}) {
  if(!username){
    return errorMsg('用户名不能为空，请重新注册')
  }else if(!password){
    return errorMsg('密码不能为空，请重新注册')
  }else if(password2!==password){
    return errorMsg('两次输入密码不一致，请重新注册')
  }else if(!type){
    return errorMsg('未指定用户类型，请重新注册')
  }

  return async dispatch =>{
    /*执行异步（也即发送Ajax）*/
    const resp = await reqRegist({username,password,type});
    /*异步得到结果resu:分两种{code：0，data}、{code：1，msg}*/
    const resu = resp.data;
    if(resu.code ===0){
      const user = resu.data;
      //分发同步action
      dispatch(authSuccess(user));
    }else{
      const msg = resu.msg;
      dispatch(errorMsg(msg));
    }
  }
}

/*登录的异步*/
export function login({username,password}) {
  return async dispatch=> {
    if (!username) {
      return dispatch(errorMsg('用户名不能为空，请重新登录'));
    } else if (!password) {
      return dispatch(errorMsg('密码不能为空，请重新的登录'));
    }

    /*执行异步（也即发送Ajax）*/
    const resp = await reqLogin(username, password);/*看api--index.js里面reqLogin传的值*/
    console.log(resp,"resp");
    /*异步得到结果resu:分两种{code：0，data}、{code：1，msg}*/
    const resu = resp.data;
    console.log(resu,"resu")
    if (resu.code === 0) {
      const user = resu.data;
      //分发同步action
      dispatch(authSuccess(user));
    } else {
      const msg = resu.msg;
      dispatch(errorMsg(msg));
    }
  }
}

/*完善更新用户信息*/
export function updateUser(user) {
  //发送异步ajax请求
  return async dispatch =>{
    const resp = await reqUpdateUser(user);/*因为要根据user来发送请求所以要传一个user进去*/
    const resu = resp.data;
  //  根据结果分发同步action
    if(resu.code===0){
      dispatch(receiveUser(resu.data))
    }else{
      dispatch(resetUser(resu.msg))
    }
  }
}

/*异步获取用户信息*/
export function getUser(user){
  return async dispatch =>{
    const resp =await reqUser();
    const resu  = resp.data;
    if(resu.code===0){
      dispatch(receiveUser(resu.data));
    }else{
      dispatch(resetUser(resu.msg))
    }
  }
}
/*
* 套路：1.发送异步ajax请求:dispatch=>{}
*       2.根据结果分发同步action:dispatch=>{
*           dispatch(result)
*       }
*
* */
// git pull -b dev origin/dev：第一次拉取