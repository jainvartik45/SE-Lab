import React,{useEffect, useState} from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography , ButtonBase ,Grid , Box , Modal , TextField ,Paper,Divider} from '@material-ui/core/';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { toStudent } from '../../actions/auth';
import useStyles from './styles'
import { deletePost, getSample } from '../../actions/posts';
import { useSelector } from 'react-redux';
import moment from 'moment';

const SampleOpen = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [postData, setPostData] = useState({name: '', message: '', Grade: '',selectedFile:''});
    const {sample} = useSelector((state) => state.posts);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      
      useEffect(() => {
        dispatch(getSample(id));
      }, [id])
      
   const handleSubmit=()=>{
    dispatch(toStudent({...postData , selectedFile : sample?.selectedFile},sample.creator));
    dispatch(deletePost(sample._id));
    navigate('/posts')
   }     
  

  return (
    <div>
      <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
            <div className={classes.section}>
             <Typography variant="h3" component="h2">{sample?.title}</Typography>
           <Typography gutterBottom variant="body1" component="p">{sample?.description}</Typography>
           <Typography variant="h6">Created by: {sample?.name}</Typography>
           <Typography variant="body1">{moment(sample?.createdAt).fromNow()}</Typography>
           
           <Divider style={{ margin: '20px 0' }} />
           <Button onClick={handleOpen}>FeedBack</Button>
           
         </div>
         <div className={classes.imageSection}>
           <img className={classes.media} src={sample?.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} />
         </div>
       </div>
     </Paper>
    
     <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h6">FeedBack</Typography>
          <TextField name="name" variant="outlined" label="Name" fullWidth value={postData.name} onChange={(e) => setPostData({ ...postData, name: e.target.value })} />
          <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} />
          <TextField name="Grade" variant="outlined" label="Grade" fullWidth value={postData.Grade} onChange={(e) => setPostData({ ...postData, Grade: e.target.value})} />
          <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
          <Button variant="contained" color="secondary" size="small" fullWidth>Clear</Button>
        </form>
  </Box>
</Modal>
</div>
  )
}

export default SampleOpen