import axios from "axios"

export default function Authenticated(token){
  return new Promise((resolve,reject)=>{
    if(!token) reject(false)
    if(typeof(token)!='string') reject(false)
    if(token.length===0) reject(false)
    axios.get('http://localhost:8000/api/user/information')
    .then(()=>resolve(true))
    .catch(()=>reject(false))
  })
}
