const express = require('express');
const {signin , signup ,toStudent} = require('../controllers/users')
const router = express.Router();

router.post('/signin',signin);
router.post('/signup',signup);
router.patch('/:id',toStudent);


module.exports = router


