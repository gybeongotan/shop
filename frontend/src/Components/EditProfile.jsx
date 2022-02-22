import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import validator from '../tools/validator'
import Api from './Api'
import { UserContext } from './UserContext'

let EditProfile = function () {
  let navigate = useNavigate();
  let {userData,updateUserData} = useContext(UserContext)
  let {profileIMG,contact,address} = userData
  let style = {
    img: {
      marginBottom: '10px',
    },
    textarea: {
      marginTop: '10px',
      background: '#f5eaea',
      padding: '10px',
    },
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    input: {
      padding: '10px',
      borderBottom: 'black solid',
    },
    button: {
      padding: '10px',
      background: 'black',
      color: 'white',
      borderRadius: '5px',
      marginTop: '10px',
    },
    logout: {
      fontFamily: 'Helvetica',
      fontSize: '1.3rem',
      marginTop: '6rem',
    },
  } 
 

  let updateIMG = ({ target }) => {
    if (target.value == '')
      return (document.querySelector('img').src = profileIMG)
    document.querySelector('img').src = target.value
  }
 
  let errorHandler = ({ response }) => {
    if (response.data.keyPattern.contact) {
      let contact = document.forms[0].contact
      contact.setCustomValidity('Invalid phone number')
      contact.reportValidity()
      contact.oninput = function () {
        this.setCustomValidity('')
        this.oninput = null
      }
    }
  }

  const updateInfo = (event) => {
    event.preventDefault()
    let formData = event.target
    let patch = {
      profileIMG: formData.profileIMG.value,
      contact: formData.contact.value,
      address: formData.address.value,
    }
  
    if (contact === patch.contact || patch.contact === '') delete patch.contact
    if (profileIMG === patch.profileIMG || patch.profileIMG === '')
      delete patch.profileIMG
    if (address === patch.address || patch.address === '') delete patch.address
    if (Object.entries(patch).length == 0)
      return (window.location.pathname = '/profile')
    Api.patch('/user/information', patch, {
      withCredentials: true,
    })
      .then(()=>{
        let entries=Object.entries(patch);
        entries.forEach(([index,value])=>{
          userData[index]=value;
        })
        updateUserData(userData)
        navigate('/profile')
      })
      .catch(errorHandler)
  }

  return (
    <div className="profile">
      <header>
        <h1>Edit Profile</h1>
      </header>
      <main>
        <form style={style.container} onSubmit={updateInfo}>
          <img src={profileIMG} />
          <input
            style={style.input}
            type="text"
            name="profileIMG"
            placeholder="image url"
            onChange={updateIMG}
          />
          <input
            style={style.input}
            type="text"
            name="contact"
            placeholder="phone number"
            pattern={validator.contact.pattern}
          />
          <textarea
            style={style.textarea}
            type="text"
            name="address"
            placeholder={address}
          />
          <input type="submit" value="submit" style={style.button} />
        </form>
      </main>
    </div>
  )
}

export default EditProfile
