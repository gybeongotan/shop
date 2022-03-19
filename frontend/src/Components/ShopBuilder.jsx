import { AppBar, Box, Typography } from "@mui/material";

export default function ShopBuilder (){
    return ( 
        <AppBar
          sx={{
            padding: "10px",
            background: "white",
            color: "black",
            position: "static",
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            gap: "1rem",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h6" color="inherit" component="div">
            {/* {shopName} */}
            Shop Builder
          </Typography>
        </AppBar>
        )
}