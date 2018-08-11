import React from 'react';
import ReactDom from 'react-dom';
import {HashRouter, Switch, Route} from 'react-router-dom'

import Login from './container/login/login'
import Regist from './container/regist/regist'
import Main from './container/main/main'
// import App from './components/app/App';

// ReactDom.render(<App />,document.getElementById('root'));
ReactDom.render(
    <HashRouter>
      <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/regist' component={Regist}/>
        <Route component={Main}/>{/*默认路径*/}
      </Switch>
    </HashRouter>
  ,document.getElementById('root')
);
//如果没有写明path，那么访问它的时候就会默认它是根路径