const express = require('express');
const {auth} = require('../middleware/auth')
const router = express.Router();
const {getPostsBySearch, getSamples,upload,updatePost,deletePost,likePost , commentPost , getSample} = require('../controllers/posts')


router.get('/',getSamples)

router.post('/', auth , upload)
router.get('/:id' , getSample)
router.delete('/:id', deletePost)




module.exports = router;
