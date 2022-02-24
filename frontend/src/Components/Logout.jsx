import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import Api from "./Api";

function Logout() {
  let { updateUserData } = useContext(UserContext);
  let navigate = useNavigate();
  
  useEffect(() => {  
    updateUserData(null)
    navigate('/login')
    delete localStorage.accessToken
  }, []);
  return <>Signing out...</>;
}

export default Logout;
