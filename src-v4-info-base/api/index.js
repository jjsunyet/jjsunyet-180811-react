/*
包含n个接口请求函数的对象模块
每个函数的返回值是promise
 */

import ajax from './ajax'
export const reqRegist = ({username,password,type})=>ajax('/regist',{username,password,type},'POST');
export  const reqLogin = (username,password) =>ajax('/login',{username,password},'POST');
export const reqUpdateUser = (user) =>ajax('/update',user,'POST');
export const reqUser = () =>ajax('/user');
// export const reqUserList = (type) => ajax(BASE+'/userlist', {type})

