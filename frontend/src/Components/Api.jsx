import axios from 'axios' 
let accessToken = localStorage.getItem('accessToken')
const instance = axios.create({
  baseURL: 'http://api.localhost:8000',
  headers: {
    Authorization: 'Bearer ' + accessToken
  },
  withCredentials: true,
})
 
export default instance
