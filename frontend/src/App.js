import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Profile from "./Components/Profile";
import Shop from "./Components/Shop";
import PublicRoute from "./utils/PublicRoute";
import PrivateRoute from "./utils/PrivateRoute";
import Orders from "./Components/Orders";
import Msgs from "./Components/Msgs";
import Home from "./Components/Home";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Logout from "./Components/Logout";
import UserDataProvider from "./Components/UserDataProvider";
import EditShop from "./Components/EditShop";
import { Box } from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>

    <Box sx={{ width: "100%", height: "100%", overflow: "hidden" }}>
      <Router> 
          <Routes>
            <Route path="/" element={<UserDataProvider />}>
              <Route path="/" element={<PublicRoute />}>
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/register" element={<Register />} />
              </Route>
              <Route path="/" element={<PrivateRoute />}>
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/shop" element={<Shop />} />
                <Route exact path="/editShop" element={<EditShop />} />
                <Route exact path="/msgs" element={<Msgs />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/logout" element={<Logout />} />
              </Route>
            </Route>
          </Routes> 
      </Router>
    </Box>
    </ThemeProvider>
  );
}

export default App;
