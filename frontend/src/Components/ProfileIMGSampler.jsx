import { FastRewind } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";

function ProfileIMGSampler({ url }) {
  let img = useRef(null);
  let [error, setError] = useState(false);
  let [loading, setLoading] = useState(false);
   useMemo(() => {
      setLoading(true) 
  }, [url]); 
  let onloadHandler = () => {
    setLoading(false)};
  let onerrorHandler = () => {
      setLoading(false)
  };

  return (
    <>
      <img
        ref={img}
        src={url}
        onLoad={onloadHandler}
        onError={onerrorHandler}
        style={{ width: "10rem", height: "10rem", margin: " 1rem auto" ,borderRadius:'50%'}}
      />
      {loading ? <CircularProgress /> : " "}
    </>
  );
}

export default ProfileIMGSampler;
