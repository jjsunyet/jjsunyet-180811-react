/*使用axios封装ajax请求的函数模块
函数的返回值是promise
* */
import axios from 'axios';
/* 有了以下这三个参数就可以发请求了
* url:请求的路径
* data:用户的所有参数信息
* type:请求的方式
* */
export default function ajax(url,data = {},type = 'GET') {
  if(type==='GET'){
    let queryStr = '';
    //Object.keys(data) : 得到指定对象自身所有属性名组成的数组   ['username', 'password']
    Object.keys(data).forEach(key =>{/*key:键值对中key:value中的key,data[key]:value*/
    //  得到所有的属性值
    // const value = data[key];
    queryStr += `${key}=${data[key]}&`;
    })
    if(queryStr){/*有参数时才有删除&的必要,没有直接请求*/
      queryStr = queryStr.substring(0,queryStr.length-1);
      //将处理好的查询字符串插入到url里面
      url += '?'+queryStr
    }return axios.get(url);
  }else{/*post请求*/
  return axios.post(url,data)
  }
}