import { useNavigate } from 'react-router-dom'
import axios from '../api/axios'
import useAuth from './use-auth'

function useRefreshToken() {
    const {setAuth} = useAuth()
    const navigate = useNavigate()
    const refresh = async ()=> {
        try {
            
            const res = await axios.get('/refresh',{
                withCredentials:true
            })
            
            setAuth(prev=>{
                return {
                    ...prev,
                    accessToken:res?.data
                }
            })
            return res?.data
        } catch (error) {
            setAuth({})
        }
    }
  return refresh
}

export default useRefreshToken