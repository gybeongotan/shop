import React, { useContext } from "react";
import { UserContext } from "../Components/UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => { 
  let {userData} = useContext(UserContext);
  return  userData ? <Navigate to='/profile'/>:(
    <div className="main">
      <Outlet />
    </div> )
};

export default PublicRoute;
