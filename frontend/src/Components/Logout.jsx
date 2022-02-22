function Logout(){
    document.cookie='accessToken=logout;expires=Thu, 01 Jan 1970 00:00:01 GM'
    window.location.pathname='/login'
    return null
}

export default Logout