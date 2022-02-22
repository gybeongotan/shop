import { Link } from "react-router-dom";
import Api from "./Api";
import { Navigate, useNavigate } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import Logo from "./Logo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
function Login() {
  let navigate = useNavigate();
  let {userData,updateUserData} = useContext(UserContext);

  const login = function(e){
    e.preventDefault()  
      e.preventDefault();
      let button = document.querySelector("button");
      button.disabled = true;
      button.innerText = "Signing in..";
      Api.post("/user/login", {
        username: document.querySelector("form").username.value,
        password: document.querySelector("form").password.value,
      })
        .then(({ data }) => {
          updateUserData(data)  
        })
        .catch((e) => {
          alert("Invalid username or password");
          button.innerText = "Login";
          button.disabled = false;
        }); 
  }
  
  return userData ? (
    <Navigate to="/profile" />
  ) : (
    <div className="login">
      <div>
        <Logo />
        <h1>Local Shop</h1>
        <form
          onSubmit={(e) => {
            login(e);
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
  );
}
export default Login;
