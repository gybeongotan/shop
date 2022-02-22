import { Link } from 'react-router-dom'
import Api from './Api'
import { useNavigate, Navigate } from 'react-router-dom'
import SubmitBtn from './SubmitBtn'
import Logo from './Logo'
import { useContext } from 'react'
import { UserContext } from './UserContext'
import Register from './Register'
function Login() {
  let navigate = useNavigate()
  let count = useContext(UserContext)
  return (
    <div className="login">
      <div>
        <Logo />
        <h1>Local Shop{count}</h1>
        <form
          onSubmit={(e) => {
            login(e, navigate)
          }}
        >
          <input
            name="username"
            type="text"
            placeholder="username"
            required
          ></input>
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          ></input>
          <SubmitBtn
            text="Sign In"
            color="white"
            background="black"
          ></SubmitBtn>
          <p>
            No account yet? <Link to="/register">Sign-up</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

function login(e, navigate) {
  e.preventDefault()
  let button = document.querySelector('button')
  button.disabled = true
  button.innerText = 'Signing in..'
  Api.post('/user/login', {
    username: document.querySelector('form').username.value,
    password: document.querySelector('form').password.value,
  })
    .then(({ data }) => {
      navigate('profile')
    })
    .catch((e) => {
      alert('Invalid username or password')
      button.innerText = 'Login'
      button.disabled = false
    })
}
export default Login
