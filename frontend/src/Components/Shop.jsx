import Gallery from "./Gallery";
import ApiModule from "./Api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Typography, Paper, Button, Avatar } from "@mui/material";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import ShopBuilder from "./ShopBuilder";
const Shop = () => {
  const Api = ApiModule();
  let [isLoading, setLoading] = useState(true),
    [shopName, setShopName] = useState(""),
    [shopDescription, setShopDescription] = useState(""),
    [shopWallpaper, setShopWallpaper] = useState(""),
    [gallery, setGallery] = useState([]),
    [noShop, setNoShop] = useState(false);

  useEffect(() => {
    Api.get("/shop/info")
      .then(({ data }) => {
        setShopName(data?.name);
        setShopDescription(data?.description);
        setGallery(data?.img?.gallery);
        setShopWallpaper(data?.img?.wallpaper);
        setLoading(false);
      })
      .catch((server) => {
        setLoading(false);
        setNoShop(server.response.status === 404);
      });
  }, []);

  if (isLoading) {
    return <h1> Loading </h1>;
  }
  let style = {
    maxWidth: "750px",
    mainContainer: {
      width: "100vw",
      height: "calc(100vh - 56px)",
      overflow: "scroll",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  };
  return (
    <Box style={style.mainContainer}>
      {noShop ? <ShopBuilder/> : (
        <>
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
            <Avatar src="https://pngimg.com/uploads/kfc/kfc_PNG37.png" />
            <Typography variant="h6" color="inherit" component="div">
              {/* {shopName} */}
              KFC
            </Typography>
          </AppBar>
          <img
            src="https://images7.alphacoders.com/464/thumb-1920-464228.jpg"
            style={{ width: "100vw" }}
          />
          <Box
            sx={{
              width: "100vw",
              display: "flex",
              flexDirection: "row",
              padding: "1rem",
              justifyContent: "space-between",
              alignItems: "center",
              boxSizing: "border-box",
            }}
          >
            <Typography>4.2k Followers</Typography>
            <h3>*****</h3>
          </Box>
          <Typography
            variant="h8"
            sx={{ padding: "1rem", color: "#555555" }}
            component="div"
          >
            KFC is an American fast food restaurant chain headquartered in
            Louisville, Kentucky that specializes in fried chicken. It is the
            world's second-largest restaurant chain after McDonald's, with
            22,621 locations globally in 150 countries as of December 2019. The
            chain is a subsidiary of Yum!
          </Typography>
          <div
            style={{
              fontSize: "0.8rem",
              fontFamily: "'Roboto'",
              alignItems: "revert",
              textAlign: "right",
              marginRight: "0px",
              width: "100vw",
              padding: "1rem",
              boxSizing: "border-box",
              color: "#1976d2",
            }}
          >
            <a
              style={{
                textDecoration: "none",
              }}
              href="#"
            >
              Follow
            </a>{" "}
            |
            <a
              style={{
                textDecoration: "none",
              }}
              href="#"
            >
              {" "}
              Products
            </a>{" "}
            |
            <a
              style={{
                textDecoration: "none",
              }}
              href="#"
            >
              {" "}
              Contacts
            </a>{" "}
            |
            <a
              style={{
                textDecoration: "none",
              }}
              href="#"
            >
              {" "}
              Chat
            </a>
          </div>
          <Box>
            <ImageList
              sx={{ width: "100%", height: "auto" }}
              cols={2}
              rowHeight={164}
            >
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </>
      )}
    </Box>
  );
};
const itemData = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIjs95GuCb5WHRP8iMdAPCChbQRntOpCYJ2Q&usqp=CAU ",
    title: "Breakfast",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6a7Hll6aHdUEOzU57LfaxHD-DyEIyZ9Ov0A&usqp=CAU",
    title: "Burger",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfGtIz9NuhCHahbDJsqCP3iKSV9dDZOx3ffg&usqp=CAU",
    title: "Camera",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE3nESe0jlAdFSevwXDarG9aB_ugJkVaYhFA&usqp=CAU",
    title: "Coffee",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOFxTbQesZVBDwjp5KdxXZH2YFPwLzxLz0nA&usqp=CAU",
    title: "Hats",
  },
];

export default Shop;
