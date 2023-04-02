import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography , ButtonBase ,Grid , Box , Modal , TextField} from '@material-ui/core/';
import useStyles from './style';
import { useNavigate } from 'react-router';
import moment from 'moment';




const SampleDetails = ({sample}) => {
    const navigate = useNavigate();
    const openPost =()=> navigate(`/posts/${sample._id}`);
    const classes = useStyles();


  return (
    
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction} onClick={openPost}>
      <div className={classes.overlay}>
        {/* <Typography variant="h6">{sample?.name}</Typography> */}
        <Typography variant="body2">{moment(sample.createdAt).fromNow()}</Typography>
      </div>
      <Typography className={classes.name} gutterBottom variant="h5" component="h2">{sample.name}</Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">{sample?.description}</Typography>
      </CardContent>
      </ButtonBase>
    </Card>
  )
}

export default SampleDetails