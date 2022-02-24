import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InventoryIcon from '@mui/icons-material/Inventory';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import StoreIcon from '@mui/icons-material/Store';
import PublicIcon from '@mui/icons-material/Public';
import { Paper } from '@mui/material'; 
export default function LabelBottomNavigation({changePathTo} ) { 
  const [value, setValue] = React.useState('recents'); 
  const handleChange = function (event, newValue)  {
    setValue(newValue); 
    changePathTo(newValue)
  };

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation  sx={{width: "90%",margin:"auto"}} value={value} onChange={handleChange}> 
      <BottomNavigationAction
        label="Orders"
        value="/orders"
        icon={<InventoryIcon  
          fontSize='medium'/>}
      /> 
       <BottomNavigationAction
        label="Shop"
        value="/shop"
        icon={<StoreIcon 
        fontSize='medium'/>}
      /> 
      <BottomNavigationAction
        label="Feed"
        value="/home"
        icon={<PublicIcon 
        fontSize='medium'/>}
      /> 
      <BottomNavigationAction
        label="Chat"
        value="/msgs"
        icon={<ChatBubbleIcon 
        fontSize='medium'/>}
      /> 
      <BottomNavigationAction
        label="Account"
        value="/profile"
        icon={<AccountBoxIcon 
        fontSize='medium'/>}
      />
    </BottomNavigation>
      </Paper>

  );
}
