let validate =  {
    password: {
      msg: "Password should be at least 7 characters long, with lowercase and uppercase letters, numbers, and special characters",
      pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,14}$",
      minLength: "7",
      maxLength: "14",
    },
    username: {
      msg: "Username should be 5 to 10 characters only and without special characters",
      pattern: "^[a-zA-Z0-9]+$",
      minLength: "5",
      maxLength: "7",
    },
    firstname: {
      msg: "Firstname shouldn't have numbers and special characters",
      pattern: "[a-zA-Z ]{1,20}"
    },
    lastname: {
      msg: "Lastname shouldn't have numbers and special characters",
      pattern: "[a-zA-Z ]{1,20}"
    },
    contact: {
        msg: "Mobile number should follow this format: +639**********",
        pattern:`(\\+63)[0-9]{10}`
    }
  }
  

export default validate;