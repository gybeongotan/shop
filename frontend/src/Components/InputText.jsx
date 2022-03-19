import { TextField } from "@mui/material";
import { useState, useRef } from "react";

const InputText = ({ validationMessage, lettersOnly, ...props }) => {
  let pwdElement = useRef(null);
  let anotherPwdElement = useRef(null);
  let [pwdMatched, setPwdMatched] = useState(false);
  let [pwdError, setPwdError] = useState(false);
  let [color, setColor] = useState("primary");

  let checkPassword = (e) => {
    console.log("entered");
    let regex = new RegExp(props?.inputProps?.pattern);
    let pass1 = pwdElement.current.value;
    let pass2 = anotherPwdElement.current.value;
    let matched = pass1 === pass2;
    let longer = pass1.length < pass2.length;
    let sameLength = pass1.length === pass2.length;
    pwdElement.current.setCustomValidity(" ");
    anotherPwdElement.current.setCustomValidity(" "); 
    if (regex?.test(pass1)) {
      setColor("success");
      pwdElement.current.setCustomValidity("");
    } else setColor("primary");
    if (!matched && sameLength) return setPwdError(true);
    if (longer) return setPwdError(true);
    if (matched) {
      setPwdMatched(true);
      anotherPwdElement.current.setCustomValidity("");
      pwdElement.current.setCustomValidity("");
    } else setPwdMatched(false);
    setPwdError(false);
  };

  let keyDownHandler = (e) => {
    if ("validationmessage" in props) e.target.setCustomValidity("");
    if (lettersOnly && /[^a-zA-Z ]{1}/.test(e.key)) return e.preventDefault();
  };
  let invalidInputHandler = ({ target: targetElement }) => {
    if (validationMessage) {
      targetElement.setCustomValidity(validationMessage);
      return;
    }
  };
  return props.type === "password" ? (
    <>
      <TextField
        onInput={checkPassword}
        inputRef={pwdElement}
        {...props}
        color={color}
        onInvalid={invalidInputHandler}
      />
      <TextField
        error={pwdError}
        label="confirm password"
        helperText={pwdError ? "Password doesn't matched" : ""}
        name="cpassword"
        type="password"
        required
        margin="dense"
        onInput={checkPassword}
        inputRef={anotherPwdElement}
        color={pwdMatched ? "success" : "primary"}
        onInvalid={()=>{anotherPwdElement.current.setCustomValidity('Password doesn\'t matched')}}
      />
    </>
  ) : (
    <TextField {...props} onKeyDown={keyDownHandler} />
  );
};
export default InputText;
