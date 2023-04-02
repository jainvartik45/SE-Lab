
const express = require('express')
const  bodyParser= require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postRouter= require('./routes/posts')
const userRouter = require('./routes/users')

const app = express();



app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts',postRouter);
app.use('/user' , userRouter);

const PORT = process.env.PORT || 6000;

const CONNECTION_URL ='mongodb+srv://vartikjain:vartikjain@cluster0.yk50dmh.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log('Connected')))
  .catch((error) => console.log(`${error} did not connect`));

// mongoose.set('useFindAndModify', false);


