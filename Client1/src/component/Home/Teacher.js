import React,{useEffect,useState} from 'react'
import { useDispatch } from 'react-redux';
import { getSamples } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { Card, CardActions, CardContent, CardMedia, Button, Typography , ButtonBase ,Grid , Box , Modal , TextField,Paper} from '@material-ui/core/';
import useStyles from './styles';
import { toStudent } from '../../actions/auth';
import SampleDetails from './Deatils/SampleDetails';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';



const Teacher = () => {
    const dispatch = useDispatch();
    const {samples} = useSelector((state) => state.posts);
    
    const classes = useStyles();
    // console.log(samples)

    const Item = styled(Paper)(({ theme }) => ({
      backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      ...theme.typography.body2,
      padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    }));


  useEffect(() => {
    dispatch(getSamples());
  }, [])

  
  
  return (
    // !samples?.length ? "No samples" : (
    //     <Grid className={classes.container} container alignItems="stretch" spacing={2}>
    //       {samples?.map((sample) => (
    //         <Grid key={sample._id} item xs={12} sm={6} md={6}>
    //             <SampleDetails sample={sample}/>

    //         </Grid>
    //       ))}
    //     </Grid>
    //   )
    !samples?.length ? "No samples" : (
    <Box sx={{ width: '100%' }}>
    {samples?.map((sample) => (
      <Stack spacing={2}>
        <Item key={sample._id}><SampleDetails sample={sample}/></Item>
      </Stack>
      ))}
    </Box>
    )
  )
}

export default Teacher