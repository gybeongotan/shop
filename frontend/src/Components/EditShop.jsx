import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function EditShop() {
  return (
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <header>
        <h1>Shop Information</h1>
      </header>
      <TextField id="standard-basic" label="Brand Name" variant="outlined" />
    </Box>
  );
}

export default EditShop;
