import React, { useState } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, seEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async(e)=>{
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
       const res = await axios.post('/register',{name,email,password}) 
       navigate('/login')
    } catch (error) {
        if(!error?.response) {
          setError('No Response from the Server')
        } else if(error?.response?.status) {
          setError(error?.response?.data)
        } else {
          setError('Failed to register')
        }
    } finally {
        setLoading(false)
    }
    
  }
  return (<>
    <div id="login-page" className="main-content">
        <div className="login-container">
            <h2>Wings Cafe Inventory</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label for="name">Full name</label>
                    <input type="text" id="name" required value={name} onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required value={email} onChange={(e)=>seEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" value={password} required onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <button type="submit" className="btn">{loading?'Registering...':'Register'}</button>
                {error && <p style={{color:'#e74c3c'}}>{error}</p>}
            </form>
        </div>
    </div>
    </>
  );
}
