const express = require ('express');
const router = express.Router()


const questionController = require('../../controllers/question');

router.post('/',questionController.createQusetion);
router.get('/',questionController.fetchAllQuestions);
router.get('/:id',questionController.fetchQuestionById);
router.delete('/:id',questionController.deleteQuestionById);
router.put('/:id',questionController.updateQuestionById);
router.post('/option/:questionId',questionController.addOption);
router.put('/option/:questionId/:id',questionController.updateOption);



module.exports = router;