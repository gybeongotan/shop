import { AppBar, Avatar, Box, Button, Container, Typography } from '@mui/material';
import { useEffect, useState, useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext' 

function Profile() { 

  let [mounted,setMounted] = useState(false);
  let {userData} = useContext(UserContext)  
 let navigate = useNavigate()
  useEffect(()=>{
    if(!userData) return navigate('/login') 
    setMounted(true)
  },[])
  
  return mounted ? (
    <Box cx={{width: '100%'}} >
      <AppBar sx={{padding:'10px',background:'white',color:'black',position: 'static'}}> 
          <Typography variant="h6" color="inherit" component="div">
            Profile
          </Typography>
      </AppBar>
      <Box sx={{display:'flex',justifyContent: 'center',alignItems:'center',flexDirection:'column', padding: '10vw'}}>
        <Avatar sx={{width: '10rem',height: '10rem' }} src={userData.profileIMG}></Avatar>
        <h2 style={{textTransform: 'capitalize',marginBottom: '0px'}}  >
          {userData.firstname + ' ' + userData.lastname}
        </h2>
        <p style={{marginTop:'5px'}}>{userData.contact}</p>
        <p className="address">{userData.address}</p>
        <Link to="/editProfile" style={{textDecoration: 'none',marginTop:'1.2rem'}}>
          <Button variant='contained'>Edit Info</Button>
        </Link>
        <Link style={{textDecoration: 'none'}} to='/logout'>
        <Button variant='text'>Log-out</Button>
          
        </Link>
      </Box >
    </Box>
  ) : <h1>noding</h1>
}

export default Profile
