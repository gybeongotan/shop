import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Api from "./Api";

function Logout() {
  let { updateUserData } = useContext(UserContext);
  let navigate = useNavigate();
  useEffect(() => { 
    Api.get("/user/logout")
      .then(() =>{ updateUserData(null); navigate('/login')})
      .catch();
  }, []);
  return <>Signing out...</>;
}

export default Logout;
