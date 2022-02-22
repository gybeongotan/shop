import { useEffect, useState } from 'react'
import validator from '../tools/validator'
import Api from './Api'

let EditProfile = function () {
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
  let [profileIMG, setProfileIMG] = useState(''),
    [fullname, setFullname] = useState(''),
    [firstname, setFirstname] = useState(''),
    [lastname, setLastname] = useState(''),
    [contact, setContact] = useState(''),
    [address, setAddress] = useState(''),
    [isLoading, setLoading] = useState(true)

  useEffect(() => {
    Api.get('/user/information', { withCredentials: true })
      .then(({ data }) => {
        setProfileIMG(data.profileIMG)
        setFirstname(data.firstname)
        setLastname(data.lastname)
        setFullname(data.firstname + ' ' + data.lastname)
        setContact(data.contact)
        setAddress(data.address)
        setLoading(false)
      })
      .catch((error) => {
        console.trace(error)
      })
  }, [])

  let updateIMG = ({ target }) => {
    if (target.value == '')
      return (document.querySelector('img').src = profileIMG)
    document.querySelector('img').src = target.value
  }

  let successHandler = () => {
    window.location.pathname = '/profile'
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

    let detect = {
      contact: {
        old: contact,
        new: patch.contact,
        same: contact === patch.contact,
      },
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
      .then(successHandler)
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
