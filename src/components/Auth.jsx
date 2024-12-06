import React from 'react'
import { Link, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/use-auth'
import useLogout from '../hooks/useLogout'

export default function Auth() {
  const {auth} = useAuth()
  const logout = useLogout()
  
  return (
    auth?.accessToken ?
    <div>
        <div className="sidebar">
          <h1>Wings Cafe</h1>
          <ul className="sidebar-menu">
              <li><Link to={'/dashboard'} id="nav-dashboard">Dashboard</Link></li>
              <li><Link to={'/products'} id="nav-dashboard">Products</Link></li>
              <li><Link to={'/users'} id="nav-dashboard">Users</Link></li>
              <li><button onClick={logout} id="nav-dashboard">Logout</button></li>
          </ul>
      </div>
      <main className='main'>
        <Outlet></Outlet>
      </main>
    </div>
    : <Navigate to={'/login'} replace/>
  )
}
