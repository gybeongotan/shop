import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Api from "./Api";
const { UserContext } = require("./UserContext");
function UserData() {
  let [userData, setUserData] = useState(null);
  let [fetched, setFetched] = useState(false);
  useEffect(() => { 
    Api.get("/user/information")
      .then(({ data }) => {
        setUserData(data);
        setFetched(true);
      })
      .catch((err) => {
        console.log({err})
        setFetched(true);
        setUserData(null);
      });
  }, []);
 
  function updateUserData(data) {
    setUserData(data);
  }
  if (!fetched) return <h1>Loading</h1>;
  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      <Outlet />
    </UserContext.Provider>
  );
}

export default UserData;
