import React from 'react';
import logo from './images/inspire.jpeg';
import './logo.less';
export default  function Logo () {
  return(
    <div className='logo-container'>
      <img src={logo} alt="logo" className='inspire-logo'/>
    </div>
  )
}