// App.js
import React from 'react';
import Header from './components/Header';
import Banner from './components/Banner';
import './App.css';
import Loginform from './components/Loginform';
import Dashboard from './components/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Users from './components/Users';
import Products from './components/Products';
import Register from './components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Banner />}/>
        <Route path='/login' element={<Loginform/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<Auth/>}>
          <Route path='dashboard' element={<Dashboard/>}/>
          <Route path='products' element={<Products/>}/>
          <Route path='users' element={<Users/>}/>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
