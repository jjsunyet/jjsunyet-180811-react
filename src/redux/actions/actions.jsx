import {reqRegist,reqLogin} from "../../api";
import {
  AUTH_SUCCESS,
  ERROR_MSG
} from '../action-types/action-types';
/*
* 1.注册登录的同步action
* 2.显示错误信息的同步action
*
* */
const authSuccess = (user) =>({type:AUTH_SUCCESS,data:user});
const errorMsg = (msg) =>({type:AUTH_SUCCESS,data:msg});

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
  if(!username){
    return errorMsg('用户名不能为空，请重新登录')
  }else if(!password){
    return errorMsg('密码不能为空，请重新的登录')
  }


  return async dispatch =>{
    /*执行异步（也即发送Ajax）*/
    const resp = await reqRegist({username,password});
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