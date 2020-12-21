const { Router } = require('express');
const CourseController = require('../Controllers/courses.controller');

const router = Router();

router.get('/list', CourseController.getCourses);

module.exports = router;
