//reducer的包裹集合
import {combineReducers} from 'redux';
//管理fun1状态的reducer

const initFun1 = [];
function fun1(state = initFun1,action) {
  switch (action.type){
    default:
      return state
  }
}

const initFun2 = [];
function fun2(state = initFun1,action) {
  switch (action.type){
    default:
      return state
  }
}

export default  combineReducers({fun1,fun2})
/*
* 1.向外暴露是一个整合后的reducer函数,格式为：function (state,action)
* 2.state的结构为 ： {fun1：fun（），fun2: fun2（）}
* 也即属性值是这两个函数执行后的结果
* */