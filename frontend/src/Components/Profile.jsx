import { useEffect, useState, useContext } from 'react'
import { Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import validator from '../tools/validator'
import { UserContext } from './UserContext'
function Profile() {
  const userData = useContext(UserContext)
  if (!userData) return <h1>Loading</h1>
  return (
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
        <Link to="/profile/edit">
          <button>Edit Info</button>
        </Link>
        <a href="/logout">Log-out</a>
      </main>
    </div>
  )
}

export default Profile
