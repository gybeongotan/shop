import axios from 'axios' 
let accessToken = localStorage.getItem('accessToken')
const instance = axios.create({
  baseURL: 'https://api.localhost',
  headers: {
    Authorization: 'Bearer ' + accessToken
  },
  withCredentials: true,
})
 
export default instance
