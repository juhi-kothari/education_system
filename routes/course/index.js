const express = require('express');
const { fetchCourseById } = require('../../controllers/course');
const router = express.Router();
const courseController = require('../../controllers/course');

router.post('/', courseController.createCourse);
router.put('/:id', courseController.updateCourse);
router.get('/', courseController.fetchAllCourses);
router.get('/:id',courseController.fetchCourseById);
router.delete('/:id',courseController.deleteCourseById);


router.post('/instructor/:courseId',courseController.addInstructor);
router.put('/instructor/:courseId/:id',courseController.updateInstructor);

router.post('/video/:courseId', courseController.addVideo);
router.put('/video/:courseId/:id', courseController.updateVideo);

module.exports = router;
