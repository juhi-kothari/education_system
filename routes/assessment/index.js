const express = require ('express');
const router = express.Router()


const assessmentController = require('../../controllers/assessment')

router.post('/',assessmentController.createAssessment);

module.exports = router;