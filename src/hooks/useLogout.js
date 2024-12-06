
import axios from '../api/axios'
import useAuth from './use-auth'
import Cookies from 'js-cookie'

function useLogout() {
    const {setAuth} = useAuth()
    const handleLogout = async() =>{
        try{
            await axios.post('/logout')
            setAuth(null)
            Cookies.remove('session');
        } catch(err) {
            console.log(err)
        }
    }
  return handleLogout
}

export default useLogout