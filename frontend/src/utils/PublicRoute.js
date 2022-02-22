import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import getCookie from '../tools/getCookie'

const PublicRoute = () => {
  let accessToken = getCookie('accessToken')
  return accessToken ? <Navigate to="/home" /> : <Outlet />
}

export default PublicRoute
