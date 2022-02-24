import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://api.localhost:8000',
  headers: {
    Authorization: 'Bearer ' + localStorage.accessToken
  },
  withCredentials: true,
})

export default instance
