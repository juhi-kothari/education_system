const express = require ('express');
const router = express.Router()


const assessmentController = require('../../controllers/assessment')

router.post('/',assessmentController.createAssessment);
router.get('/:id',assessmentController.fetchAssessmentById);
router.put('/:id',assessmentController.updateAssessment);
router.get('/',assessmentController.fetchAllAssessment);
module.exports = router;