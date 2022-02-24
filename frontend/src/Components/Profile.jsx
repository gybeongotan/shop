import {
  AppBar,
  Avatar,
  Box,
  Button,
  Dialog,
  Alert,
  DialogContent,
  TextField,
  Slide,
  Toolbar,
  Typography,
  IconButton,
  CircularProgress,
  Fade,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import React, { useEffect, useState, useContext, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import validator from "../tools/validator";
import Api from "./Api";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {
  let [mounted, setMounted] = useState(false);
  let [error, setErrorMsg] = useState("");
  let { userData, updateUserData } = useContext(UserContext);
  let [loading, setLoading] = useState(false);
  let submitBtn = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    if (!userData) return navigate("/login");
    setMounted(true);
  }, []);

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMsg("");
    setOpen(false);
  };

  const errorHandler = (e) => {
    if (e.response) setErrorMsg(e.response.data.message);
    else setErrorMsg(e.message);
    setLoading(false);
  };
  const handleSave = (event) => {
    if (loading) return Error();
    setLoading(true);
    event.preventDefault();
    let formData = document.querySelector("form");
    let patch = {
      profileIMG: formData.profileIMG.value,
      contact: formData.contact.value,
      address: formData.address.value,
    };

    if (userData.contact === patch.contact || patch.contact === "")
      delete patch.contact;
    if (userData.profileIMG === patch.profileIMG || patch.profileIMG === "")
      delete patch.profileIMG;
    if (userData.address === patch.address || patch.address === "")
      delete patch.address;
    if (Object.entries(patch).length == 0) {
      setLoading(false);
      setOpen(false);
      return;
    }

    Api.patch("/user/information", patch, {
      withCredentials: true,
    })
      .then(() => {
        let entries = Object.entries(patch);
        entries.forEach(([index, value]) => {
          userData[index] = value;
        });
        updateUserData(userData);
        setLoading(false);
        setOpen(false);
      })
      .catch(errorHandler);
  };

  let updateIMG = ({ target }) => {
    if (target.value == "")
      return (document.querySelectorAll("img")[1].src = userData.profileIMG);
    document.querySelectorAll("img")[1].src = target.value;
  };

  return mounted ? (
    <Box cx={{ width: "100%" }}>
      <AppBar
        sx={{
          padding: "10px",
          background: "white",
          color: "black",
          position: "static",
        }}
      >
        <Typography variant="h6" color="inherit" component="div">
          Profile
        </Typography>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "10vw",
        }}
      >
        <Avatar
          sx={{ width: "10rem", height: "10rem" }}
          src={userData.profileIMG}
        ></Avatar>
        <h2 style={{ textTransform: "capitalize", marginBottom: "0px" }}>
          {userData.firstname + " " + userData.lastname}
        </h2>
        <p style={{ marginTop: "5px" }}>{userData.contact}</p>
        <p className="address">{userData.address}</p>
        <Button variant="contained" onClick={handleClickOpen}>
          Edit Info
        </Button>
        <Link style={{ textDecoration: "none" }} to="/logout">
          <Button variant="text">Log-out</Button>
        </Link>
      </Box>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton> 
            <Fade
              in={loading}
              style={{
                transitionDelay: loading ? "800ms" : "0ms",
              }}
              unmountOnExit
            >
              <CircularProgress
                thickness={7}
                size="1rem"
                sx={{ color: "white" }}
              />
            </Fade>
            <Button
              autoFocus
              color="inherit"
              onClick={() => submitBtn.current.click()}
            >
              {loading ? "saving" : "save"}
            </Button>
          </Toolbar>
        </AppBar>

        <DialogContent>
          <Box component="form" action="#" onSubmit={handleSave}>
            <Alert
              style={{ display: error ? "block" : "none" }}
              severity="error"
            >
              {error}
            </Alert>
            <Avatar
              sx={{ width: "10rem", height: "10rem", margin: " 1rem auto" }}
              src={userData.profileIMG}
            />
            <TextField
              margin="dense"
              name="profileIMG"
              label="Image Link"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={userData.profileIMG}
              onChange={updateIMG}
            />
            <TextField
              margin="dense"
              name="contact"
              label="Phone Number"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={userData.contact}
            />
            <TextField
              margin="dense"
              name="address"
              label="Address"
              type="text"
              fullWidth
              variant="standard"
              defaultValue={userData.address}
            />
            <input type="submit" ref={submitBtn} style={{ display: "none" }} />
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  ) : (
    <h1>noding</h1>
  );
}

export default Profile;
