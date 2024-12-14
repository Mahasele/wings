import axios from "axios";
//const baseURL = 'https://idyllic-granita-9fe36e.netlify.app/.netlify/functions/app'
const baseURL = 'https://wings-cafe.netlify.app/.netlify/functions/app/'
//const baseURL = 'http://localhost:4000'
export default axios.create({
    baseURL
})

export const axiosIntercepter = axios.create({
    baseURL,
    headers:{
        "Content-Type":'application/json'
    },
    withCredentials:true
})