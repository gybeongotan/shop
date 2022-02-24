import React, { useContext } from 'react'
import { UserContext } from '../Components/UserContext'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/NavBar' 
const PrivateRoute = () => { 
  const navigateTo = useNavigate();
  const changePathTo = (path)=>{
    navigateTo(path)
  }
  
  let {userData} = useContext(UserContext)
  return userData ? ( 
    <>
    <Outlet />
    <Navbar changePathTo={changePathTo} />
    </>
  ) : (
    <Navigate to="/login"  />
  )
}

export default PrivateRoute
