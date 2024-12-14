import React, { useEffect, useState } from 'react'
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/use-auth'
import useLogout from '../hooks/useLogout'
import useRefreshToken from '../hooks/useRefreshToken'
import useSingleFetch from '../hooks/useSingleFetch'

export default function Auth() {
  const {auth} = useAuth()
  const logout = useLogout()
  const [loading,setLoading] = useState(true)
  const refresh = useRefreshToken()
  const location = useLocation().pathname
  const location2 = useLocation()
  
  useEffect(()=>{
        let mounted = true
        const generateNewAccess = async () =>{
            try{
                await refresh()
            } catch(err) {
                console.log(err)
            }finally{
                mounted && setLoading(false)
            }
        }

        !auth?.accessToken ?  generateNewAccess() : setLoading(false)
        return ()=>{
            mounted = false
        }
    },[])
  const user = useSingleFetch('/user',[auth])
  
  return (
    loading ? <p>Loading...</p>:
    auth?.accessToken ?
    <div>
        <div className="sidebar">
          <h1>Wings Cafe</h1>
          <ul className="sidebar-menu">
              <li><Link style={location==='/dashboard'?{backgroundColor:'#666'}:{}} to={'/dashboard'} id="nav-dashboard">Dashboard</Link></li>
              <li><Link style={location==='/products'?{backgroundColor:'#666'}:{}} to={'/products'} id="nav-dashboard">Products</Link></li>
              <li><Link style={location==='/users'?{backgroundColor:'#666'}:{}} to={'/users'} id="nav-dashboard">Users</Link></li>
              <li><Link style={location==='/profile'?{backgroundColor:'#666'}:{}} to={'/profile'} id="nav-dashboard">Profile</Link></li>
              <button type='button' onClick={async()=> await logout()} id="logout">Logout</button>
          </ul>
      </div>
      <main className='main'>
        <Outlet></Outlet>
      </main>
    </div>
    : <Navigate to={'/login'} state={{from:location2}} replace/>
  )
}
