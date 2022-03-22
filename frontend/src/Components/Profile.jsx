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
import ApiModule from "./Api";
import ProfileIMGSampler from "./ProfileIMGSampler";
import axios from "axios";
import InputFile from "./InputFile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Profile() {
  const style = {
    appBar: {
      padding: "10px",
      background: "white",
      color: "black",
      position: "static",
    },
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      padding: "10vw",
    },
    avatar: { width: "12.1rem", height: "12rem" },
    appBarEdit: { position: "relative"},
    logout:{ textDecoration: "none" , }
  };
  const Api = ApiModule();
  let [mounted, setMounted] = useState(false);
  let [error, setErrorMsg] = useState("");
  let [loading, setLoading] = useState(false);
  let [selectedFile, setSelectedFile] = useState();
  let submitBtn = useRef();
  let { userData, updateUserData } = useContext(UserContext);
  let [profileIMGSampler, setProfileIMGSampler] = useState(userData.profileIMG);
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
    console.log(e.response.data);
    if (typeof e.response == "object") setErrorMsg(e.response.data.message);
    else setErrorMsg(e.message);
    setLoading(false);
  };
  const handleSave = (event) => {
    if (loading) return Error();
    setLoading(true);
    event.preventDefault();
    let form = document.querySelector("form");
    let patch = {
      profileIMG: form.profileIMG.value,
      contact: form.contact.value,
      address: form.address.value,
    };

    if (userData.contact === patch.contact || patch.contact === "")
      delete patch.contact;
    if (userData.profileIMG === patch.profileIMG || patch.profileIMG === "")
      delete patch.profileIMG;
    if (userData.address === patch.address || patch.address === "")
      delete patch.address;
    if (Object.entries(patch).length == 0) {
      setLoading(false);
      handleClose();
      return;
    }

    let formData = new FormData();

    if (selectedFile) {
      let blob = new Blob([selectedFile], {
        type: selectedFile.type,
        name: selectedFile.name,
      });
      formData.append("profileIMG", blob);
    }
    if (patch?.contact) formData.append("contact", patch?.contact);
    if (patch?.address) formData.append("address", patch?.address);
    Api.patch("/user/information", formData)
      .then(({ data }) => {
        let entries = Object.entries(data.data);
        entries.forEach(([index, value]) => {
          userData[index] = value;
        });
        userData.profileIMG = profileIMGSampler;
        updateUserData(userData);
        setLoading(false);
        setOpen(false);
      })
      .catch(errorHandler);
  };

  let updateIMG = (event) => {
    if (!event.target?.files) {
      setProfileIMGSampler(userData.profileIMG);
      setSelectedFile();
      return;
    }

    setSelectedFile(event.target.files[0]);

    let url = URL.createObjectURL(event.target.files[0]);
    setProfileIMGSampler(url);
  };

  return mounted ? (
    <Box cx={{ width: "100%" }}>
      <AppBar sx={style.appBar}>
        <Typography variant="h6" color="inherit" component="div">
          Profile
        </Typography>
      </AppBar>
      <Box sx={style.main}>
        <Avatar sx={style.avatar} src={userData.profileIMG}></Avatar>
        <h2
          style={{
            marginTop: "4rem",
            textTransform: "capitalize",
            marginBottom: "0px",
          }}
        >
          {userData.firstname + " " + userData.lastname}
        </h2>
        <p style={{ marginTop: "5px" }}>{userData.contact}</p>
        <p className="address">{userData.address}</p>
        <Button
          style={{ marginTop: "2rem" }}
          variant="contained"
          onClick={handleClickOpen}
        >
          Edit Info
        </Button>
        <Link style={style.logout} to="/logout">
          <Button sx={style.logout}variant="text">Log-out</Button>
        </Link>
      </Box>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={style.appBarEdit}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit
            </Typography>
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
              fontSize="large"
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
            <ProfileIMGSampler url={profileIMGSampler} />

            <InputFile
              label="Change Profile"
              name="profileIMG"
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
