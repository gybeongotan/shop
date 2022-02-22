import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../Components/NavBar'
import { UserContext } from '../Components/UserContext'
const PrivateRoute = () => {
  let [loggedIn, setloggedIn] = useState(false)
  let [isWaiting, setWaiting] = useState(true)
  let [userData, setUserData] = useState(null)
  useEffect(() => {
    axios
      .get('http://api.localhost:8000/user/information', {
        withCredentials: true,
      })
      .then(({ data }) => {
        setloggedIn(true)
        setWaiting(false)
        setUserData(data)
      })
      .catch(() => {
        setloggedIn(false)
        setWaiting(false)
      })
  }, [])

  if (isWaiting) return <h1>Loading</h1>
  return loggedIn ? (
    <div className="app">
      <UserContext.Provider value={userData}>
        <Outlet />
        <Navbar />
      </UserContext.Provider>
    </div>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRoute
