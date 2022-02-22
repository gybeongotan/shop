import Login from './Components/Login'
import Register from './Components/Register'
import Profile from './Components/Profile'
import Shop from './Components/Shop'
import PublicRoute from './utils/PublicRoute'
import PrivateRoute from './utils/PrivateRoute'
import Orders from './Components/Orders'
import Msgs from './Components/Msgs'
import Home from './Components/Home'
import react, { createContext, Fragment, useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Logout from './Components/Logout'
import { UserContext } from './Components/UserContext'
import EditProfile from './Components/EditProfile'

function App() {
  return (
    <div className="main">
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<PublicRoute />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route path="/" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/msgs" element={<Msgs />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/register" element={<Register />} />
            </Route>
          </Routes>
        </Fragment>
      </Router>
    </div>
  )
}

export default App
