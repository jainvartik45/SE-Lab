import React from 'react'
import { useParams } from 'react-router';
import { Card, CardActions, CardContent, CardMedia, Button, Typography , ButtonBase ,Grid , Box , Modal , TextField ,Paper,Divider} from '@material-ui/core/';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



const UserProfile = () => {

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const user = JSON.parse(localStorage.getItem('profile'))
  
  
  
  return (
    <Box sx={{ width: '100%' }}>
      <Typography gutterBottom variant="body1" component="h5">{user.result.name}</Typography>
      {user.result.feedback.map((feedback) => (
      <Stack spacing={2}>
        <Item>
        <div >
           <img  src={feedback.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
         </div>  
        <p>{feedback.name}</p>
        <p>{feedback.message}</p>
        <p>{feedback.grade}</p>
        </Item>
      </Stack>
      ))}
    </Box>
  )
}

export default UserProfile