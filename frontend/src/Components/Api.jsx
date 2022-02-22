import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://api.localhost:8000',
  withCredentials: true,
})

export default instance
