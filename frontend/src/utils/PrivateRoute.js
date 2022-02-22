import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/NavBar' 
import { UserContext } from '../Components/UserContext'
const PrivateRoute = () => { 
  let {userData} = useContext(UserContext)
  return userData ? (
    <div className="app"> 
        <Outlet />
        <Navbar /> 
    </div>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute
