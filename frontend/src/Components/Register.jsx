import { Link } from 'react-router-dom'
import Api from './Api'
import { useState, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import validate from '../tools/validator'
import SubmitBtn from './SubmitBtn'
import Logo from './Logo'
function Register() {
  let submitBtnStyle = {
    background: 'black',
    color: 'white',
    padding: '1rem',
    fontSize: '1rem',
    witdh: '3rem',
  }

  let submit = useRef(null)
  let [error, setError] = useState('')
  const [step, changeStep] = useState(1)
  let history = useNavigate()

  let register = function (e) {
    e.preventDefault()
    submit.current.disabled = true
    submit.current.innerText = 'processing'
    submit.current.style = 'background: grey'
    let [
      firstname,
      lastname,
      username,
      password,
      contact,
    ] = document.querySelectorAll('input')
    let address = document.querySelector('textarea')
    Api.post('/user/registration', {
      username: username.value,
      password: password.value,
      firstname: firstname.value,
      lastname: lastname.value,
      contact: contact.value,
      address: address.value,
    })
      .then(() => {
        submit.current.innerText = 'Succesful'
        submit.current.style = 'color: white;background: green'
        setTimeout(function () {}, 3000)
      })
      .catch(({ response }) => {
        submit.current.style = `
        background: black;
        color: white;
        padding: 1rem;
        fontSize: 1rem";
        witdh: 3rem`
        submit.current.innerText = 'Submit'
        submit.current.disabled = false
        console.log(response.data)
      })
  }

  return (
    <div className="register">
      <div>
        <Logo />
        <h1>Local Shop</h1>
        {error ? <div>{error}</div> : null}
        <form
          style={step === 1 ? { display: 'flex' } : { display: 'none' }}
          onSubmit={(e) => {
            e.preventDefault()
            changeStep(2)
            return false
          }}
        >
          <input
            required
            type="text"
            title={validate.firstname.msg}
            pattern={validate.firstname.pattern}
            placeholder="Firstname"
          ></input>
          <input
            required
            type="text"
            title={validate.lastname.msg}
            pattern={validate.lastname.pattern}
            placeholder="Lastname"
          ></input>
          <input
            required
            type="text"
            title={validate.username.msg}
            pattern={validate.username.pattern}
            placeholder="Username"
          ></input>
          <input
            required
            type="password"
            title={validate.password.msg}
            pattern={validate.password.pattern}
            placeholder="password"
          ></input>
          <SubmitBtn background="#dddddd" color="black" text="Next >" />
          <p>
            Already have an account? <Link to="/login">Sign-in</Link>
          </p>
        </form>
        <form
          style={step === 2 ? { display: 'flex' } : { display: 'none' }}
          onSubmit={register}
        >
          <input
            required
            type="text"
            title={validate.contact.msg}
            pattern={validate.contact.pattern}
            placeholder="Mobile Number"
          ></input>
          <textarea required placeholder="address" maxLength="100"></textarea>
          <button ref={submit} style={submitBtnStyle}>
            Submit
          </button>

          <button
            type="button"
            onClick={(e) => {
              changeStep(1)
            }}
          >
            &lt; Prev{' '}
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
