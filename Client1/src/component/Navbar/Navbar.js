import React, { useState , useEffect} from 'react'
import { AppBar,Typography,Toolbar, Avatar, Button } from '@material-ui/core'
import useStyles from './style'
import memories from '../../images/memories.jpeg'
import {Link , useNavigate,useLocation} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'

 
const Navbar = () => {
    const classes = useStyles();
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const user1 = JSON.parse(localStorage.getItem('profile'))

    
    

    const logout = () =>{
      dispatch({type : 'LOGOUT'});
      navigate('/auth')
      setUser(null)
    }

    useEffect(() => {
      const token = user?.token

      if (token) {
        const decodedToken = decode(token);
  
        if (decodedToken.exp * 1000 < new Date().getTime()) logout();
      }
      
      setUser(JSON.parse(localStorage.getItem('profile')))
    }, [location])

   
    
  return (
    <AppBar className={classes.appBar} color='inherit' position='static'>
         <div className={classes.brandContainer}>
              <Typography component={Link} to='/' className={classes.heading} variant='h2' align='center'>Penmanship</Typography>
              <img className={classes.image} src={memories} alt='memories' height='60'/>
         </div>
         <Toolbar className={classes.toolbar}>
            {user ? (
                <div className={classes.profile}>
                  <Avatar className={classes.purple} component={Link} to={`/user/${user1?.result?._id}`} alt={user1?.result?.name} src={user1?.result?.imageURL}>{user1?.result?.name.charAt(0)}</Avatar>
                  <Typography className={classes.userName} variant='h6' >{user1?.result?.name}</Typography>
                  <Button variant='contained' className={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ) :(
                <Button component={Link} to="/auth" variant='contained' color='primary'>Sign In</Button>
            )}
          </Toolbar>      
    </AppBar>
  )
}

export default Navbar