import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Shop from "./Components/Shop";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Orders from "./Components/Orders";
import Msgs from "./Components/Msgs";
import Home from "./Components/Home";
import { Fragment, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "./Components/Logout";
import { UserContext } from "./Components/UserContext";
import EditProfile from "./Components/EditProfile";
import Api from "./Components/Api";
import UserDataProvider from "./Components/UserDataProvider";
import EditShop from "./Components/EditShop";
import { Box } from '@mui/material';
import NavBar from './Components/NavBar';
function App() {
  return (
    <Box sx={{width: '100%',height: "100%",overflow:'hidden'}}>
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<UserDataProvider />}>
              <Route path="/" element={<PublicRoute />}>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route path="/home" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/editShop" element={<EditShop />} />
                <Route path="/msgs" element={<Msgs />} />
                <Route path="/orders" element={<Orders />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route path="/editProfile" element={<EditProfile />} />
                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Route>

          </Routes>
        </Fragment>

      </Router>

    </Box>
  );
}

export default App;
