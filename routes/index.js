const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const courseRoute = require('./course');

router.use('/user', userRoute);
router.use('/course', courseRoute);

module.exports = router;