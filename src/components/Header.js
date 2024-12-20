// components/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

function Header() {
  const {auth} = useAuth()
  return (
    <header className="header" style={auth.accessToken ?{position:'fixed',top:0,left:0,right:0}:{}}>
      <Link to={'/'}><div className="logo">WingsCafe</div></Link>
      <nav className="nav-links">
        
      </nav>
      <div className="header-actions">
        <nav className="nav-links">
          {
          !auth?.accessToken && <>
          <button className="sign-in"><Link to='/login'>Login</Link></button>
          <button className="sign-in"><Link to='/register'>Register</Link></button>
          </>}
        </nav>
      </div>
    </header>
  );
}

export default Header;
