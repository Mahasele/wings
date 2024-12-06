// components/Header.js
import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/use-auth';

function Header() {
  const {auth} = useAuth()
  return (
    <header className="header">
      <div className="logo">WingsCafe</div>
      <nav className="nav-links">
        
      </nav>
      <div className="header-actions">
        <nav className="nav-links">
          {
          !auth?.accessToken && <button className="sign-in"><Link to='/login'>Login</Link></button>
          }
        </nav>
      </div>
    </header>
  );
}

export default Header;
