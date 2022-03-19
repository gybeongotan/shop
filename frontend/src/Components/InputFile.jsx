import { Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useRef } from "react";
import ClearIcon from "@mui/icons-material/Clear";

function InputFile({ label,onChange ,name}) {
  let [filename, setFilename] = useState("");
  let inputElement = useRef();
  let handleFileInput = (event) => {
    let file = event.target.files[0];
    if (file) setFilename(file.name);
    onChange(event)
  };

  let removeFile  = (event)=>{ 
    inputElement.current.type = 'text'  
    inputElement.current.type = 'file'  
    setFilename("")
    delete event.target.files
    onChange(event)
  };
  return (
    <>
      <input
       name={name}
        accept="image/*"
        style={{ display: "none" }}
        id="raised-button-file"
        multiple
        type="file"
        onChange={handleFileInput} 
        ref={inputElement}
      />
      {filename ? (
        <Box
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1rem",
            alignItems: "center",
          }}
        >
          <Typography style={{ textOverflow: "hidden" }}>{filename}</Typography>
          <IconButton onClick={removeFile}>
            <ClearIcon />
          </IconButton>
        </Box>
      ) : (
        <label htmlFor="raised-button-file">
          <Button variant="raised" component="span">
            {label}
          </Button>
        </label>
      )}
    </>
  );
}

export default InputFile;
