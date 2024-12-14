import React, { useState } from 'react';
import axios from '../api/axios';
import useAuth from '../hooks/use-auth';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Loginform() {
  const [email, seEmail] = useState('');
  const [error, setError] = useState('');
   const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const {setAuth} = useAuth()
  const from = useLocation().state?.from?.pathname || '/dashboard'
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
       const res = await axios.post('/login',{email,password}) 
       if (res?.data?.error) {
        setError('Sorry, our server is down at the moment, please try later.')
        return
       }
       setAuth({accessToken:res?.data})
       navigate(from,{replace:true})
    } catch (error) {
        if(!error?.response) {
          setError('No Response from the Server')
        } else if(error?.response?.status) {
          setError(error?.response?.data)
        } else {
          setError('Failed to login')
        }
    } finally{
      setLoading(false)
    }
    
  }
  return (<>
    <div id="login-page" className="main-content">
        <div className="login-container">
            <h2>Wings Cafe Inventory</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required value={email} onChange={(e)=>seEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn">{loading ?"Logging...":"Login"}</button>
                {error && <p style={{color:'#e74c3c'}}>{error}</p>}
            </form>
        </div>
    </div>
    </>
  );
}

