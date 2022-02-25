import { Link } from "react-router-dom";
import Api from "./Api";
import { Navigate, useNavigate } from "react-router-dom";
import SubmitBtn from "./SubmitBtn";
import Logo from "./Logo";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { Avatar, Box, TextField, Container, Button } from "@mui/material";
import handBagImg from "../assets/local_mall_black_24dp.svg";
function Login() {
  let navigate = useNavigate();
  let { userData, updateUserData } = useContext(UserContext);

  const login = function (e) {
    e.preventDefault();
    e.preventDefault();
    let button = document.querySelector("button");
    button.disabled = true;
    button.innerText = "Signing in..";
    Api.post("/user/login", {
      username: document.querySelector("form").username.value,
      password: document.querySelector("form").password.value,
    })
      .then((res) => {
        updateUserData(res.data.userData);
        localStorage.setItem('accessToken', res.data.accessToken)
      })
      .catch((e) => {
        alert("Invalid username or password");
        button.innerText = "Login";
        button.disabled = false;
      });
  };

  return userData ? (
    <Navigate to="/profile" />
  ) : (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "space-evenly",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          login(e);
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "nowrap",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ height: "10rem", width: "10rem" }} src={handBagImg} />

        <h1>Local Shop</h1>
        <TextField
          margin="dense"
          name="username"
          label="Username"
          type="text"
          fullWidth
          variant="outlined"
          required
        />
        <TextField
          margin="dense"
          name="password"
          label="password"
          type="password"
          fullWidth
          variant="outlined"
          required
        />
        <Button style={{ marginTop: "1rem" }} type='submit' variant="outlined"  >
          Log-In
        </Button>
        <h5>or</h5>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <Button variant="contained">Sign-up</Button>
        </Link>
      </Box>
    </Container>
  );
}
export default Login;
