import React, { useEffect, useState } from 'react';
import './Profile.css';
import AccountDeletion from './Delete';
import useAuth from '../hooks/use-auth';
import useAxiosIntercepters from '../hooks/useAxiosIntercepters';

export default function UserProfile() {

  const {user} = useAuth()
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [newPassword,setNewPassword] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [email,seEmail] = useState('')
  const axios = useAxiosIntercepters()
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    seEmail(user.email)
    setName(user.name)
  },[user])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setError('')
    try {
        const res = await axios.put('/user',{userId:user?.userId,name,email,password:confirmPassword})
        alert(res.data)
    } catch (error) {
        if(!error?.response) {
          setError('No Response from the Server')
        } else if(error?.response?.status) {
          setError(error?.response?.data)
        } else {
          setError(error.message)
        }
    } 
  };
  const handlePasswordUpdate = async (e) => {
    setPasswordError('')
    e.preventDefault()
    try {
        const res = await axios.put('/password',{userId:user?.userId,newPassword,password})
        setNewPassword('')
        setPassword('')
        alert(res.data)
    } catch (error) {
        if(!error?.response) {
          setPasswordError('No Response from the Server')
        } else if(error?.response?.status) {
          setPasswordError(error?.response?.data)
        } else {
          setPasswordError(error.message)
        }
    } 
  };
  const handleAccountDeletion = async (password) => {
    try {
        const res = await axios.delete(`/user?userId=${user?.userId}&password=${password}`)
        alert(res.data)
    } catch (error) {
        if(!error?.response) {
          alert('No Response from the Server')
        } else if(error?.response?.status) {
          alert(error?.response?.data)
        } else {
          alert(error.message)
        }
    } 
  };

  return (
    <section className="profile-update-section">
      <header>
        <h2 className="profile-title">Profile Information</h2>
      </header>

      <form onSubmit={handleProfileUpdate} className="profile-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">Name</label>
          <input 
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className={`form-input`}
          />
          
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input 
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e)=>seEmail(e.target.value)}
          />
          
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password" className="form-label">Verify Password</label>
          <input 
            id="confirm-password"
            name="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className={`form-input`}
          />
        </div>
        {error && <p style={{color:'#e74c3c'}}>{error}</p>}
        <div className="form-actions">
          <button 
            type="submit" 
            className="save-button"
          >
            Save
          </button>

        </div>
      </form>
      <h2 className="profile-title">Change Password</h2>
      <form onSubmit={handlePasswordUpdate} className="profile-form">
        <div className="form-group">
          <label htmlFor="password" className="form-label">Old Password</label>
          <input 
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className={`form-input`}
          />
        </div>

        <div className="form-group">
          <label htmlFor="new-password" className="form-label">New Password</label>
          <input 
            id="new-password"
            name="new-password"
            type="password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />
          
        </div>
        {passwordError && <p style={{color:'#e74c3c'}}>{passwordError}</p>}
        <div className="form-actions">
          <button 
            type="submit" 
            className="save-button"
          >
            Change
          </button>

        </div>
      </form>
      <AccountDeletion onAccountDelete={handleAccountDeletion}/>
    </section>
  );
}

