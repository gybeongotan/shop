import { FastRewind } from "@mui/icons-material";
import { Avatar, CircularProgress } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
function ProfileIMGSampler({ url }) {
  let img = useRef(null);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
  useMemo(() => {
    setLoading(true);
  }, [url]);
  let onloadHandler = () => {
    setLoading(false);
  };
  let onerrorHandler = () => {
    setLoading(false);
  };
  let style = {
    avatar: { width: "12.1rem", height: "12rem" },
  };
  return (
    <> 
      <Avatar
        sx={style.avatar}
        ref={img}
        src={url}
        onLoad={onloadHandler}
        onError={onerrorHandler}
      ></Avatar>
      {loading ? <CircularProgress /> : " "}
    </>
  );
}

export default ProfileIMGSampler;
