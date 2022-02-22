import { Link } from "react-router-dom";
import ShopIcon from "../assets/icons/Shop.ico";
import HomeIcon from "../assets/icons/Home.ico";
import ProfileIcon from "../assets/icons/Profile.ico";
import MsgsIcon from "../assets/icons/Msgs.ico";
import OrdersIcon from "../assets/icons/Orders.ico";
import { BrowserRouter as Router } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="navBar"> 
        
      <Link to="/orders">
        <OrdersIcon path="/orders" colorA="blue" colorB="black" />
      </Link>
      <Link to="/shop">
        <ShopIcon path="/shop" colorA="blue" colorB="black" />
      </Link>
      <Link to="/home">
        <HomeIcon path="/home" colorA="blue" colorB="black" />
      </Link>
      <Link to="/msgs">
        <MsgsIcon path="/msgs" colorA="blue" colorB="black" />
      </Link>
      <Link to="/profile">
        <ProfileIcon path="/profile" colorA="blue" colorB="black" />
      </Link> 
    </div>
  );
};

export default NavBar;
