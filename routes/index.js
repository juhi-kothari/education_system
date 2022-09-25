const express = require('express');
const router = express.Router();
const userRoute = require('./user');
const courseRoute = require('./course');
const questionRoute = require('./qusetion');
const assessmentRoute = require('./assessment');

router.use('/user', userRoute);
router.use('/course', courseRoute);
router.use('/question', questionRoute);
router.use('/assessment',assessmentRoute);

module.exports = router;