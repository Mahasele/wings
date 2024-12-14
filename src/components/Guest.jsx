
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '../hooks/use-auth'

export default function Guest() {
  const {auth} = useAuth()
  const from = useLocation().state?.from?.pathname || '/dashboard'
  
  return (
    !auth?.accessToken ?
    <div>
        <Outlet></Outlet>
    </div>
    : <Navigate to={from} replace/>
  )
}