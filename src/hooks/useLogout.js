import axios from '../api/axios'
import useAuth from './use-auth'

function useLogout() {
    const {setAuth} = useAuth()
    const handleLogout = async() =>{
        try{
            await axios.post('/logout')
            setAuth({}) 
        } catch(err) {
            console.log(err)
        }
    }
  return handleLogout
}

export default useLogout