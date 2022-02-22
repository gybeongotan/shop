import { useEffect, useState, useContext } from 'react'
import { Router, Routes, Route, Link, Navigate,useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext'
function Profile() { 

  let [mounted,setMounted] = useState(false);
  let {userData} = useContext(UserContext)  
 let navigate = useNavigate()
  useEffect(()=>{
    if(!userData) return navigate('/login') 
    setMounted(true)
  },[])
  
  return mounted ? (
    <div className="profile">
      <header>
        <h1>Profile</h1>
      </header>
      <main>
        <img src={userData.profileIMG}></img>
        <h2 className="fullname">
          {userData.firstname + ' ' + userData.lastname}
        </h2>
        <p className="contact">{userData.contact}</p>
        <p className="address">{userData.address}</p>
        <Link to="/editProfile">
          <button>Edit Info</button>
        </Link>
        <Link to='/logout'>Log-out</Link>
      </main>
    </div>
  ) : <h1>noding</h1>
}

export default Profile
