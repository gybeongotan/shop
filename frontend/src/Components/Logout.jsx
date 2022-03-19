import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import { UserContext } from "./UserContext";
import ApiModule from "./Api";
const Api = ApiModule();
function Logout() {
  let { updateUserData } = useContext(UserContext);
  let navigate = useNavigate();
  
  useEffect(() => {  
    Api.get("/user/logout").then(console.log).catch(console.error);
    updateUserData(null)
    navigate('/login')
    delete localStorage.accessToken
  }, []);
  return <>Signing out...</>;
}

export default Logout;
