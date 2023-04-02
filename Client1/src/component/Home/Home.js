import React,{useState} from 'react'

import useStyles from './styles'
import { useSelector } from 'react-redux';
import { Grid, CircularProgress, Button ,Paper,Typography,TextField} from '@material-ui/core';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { uploadhandSample } from '../../actions/posts';
import Teacher from './Teacher';


const initialState = {selectedFile : '',name:'' ,description:''};

const Home =()=>{
  const dispatch = useDispatch();
  const classes = useStyles();
   const [postData , setPostData] = useState(initialState)
   const user = JSON.parse(localStorage.getItem('profile'))
   const handleSubmit = () =>{
    dispatch(uploadhandSample({...postData , name : user?.result?.name}));
  }
  //  console.log(user);

  const clear = () => {
    
    setPostData({ name: '', description: '', selectedFile: '' })
  };

  

   if (user?.result?.email.includes("Teacher")) {
    return (
      <Teacher/>
    );
  }

    if(!user){
      return(
        <div>
          You Cannot Upload Sample!
        </div>
      )
    }

    return(
      <Paper className={classes.paper}>
      <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant="h6">Upload HandWriting Sample</Typography>
        <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={4} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <div className={classes.fileInput}><FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} /></div>
        <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>

    );
}

export default Home