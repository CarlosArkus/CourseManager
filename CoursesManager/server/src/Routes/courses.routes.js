const { Router } = require('express');
const { check } = require('express-validator');

const CourseController = require('../Controllers/courses.controller');
const { verifyToken } = require('../Middlewares/validateToken');
const validateFields = require('../Middlewares/validateFields');

const router = Router();

router
  .get('/list', CourseController.getCourses)
  .post(
    '/add',
    [
      verifyToken,
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('courseType', 'Course type is required').not().isEmpty(),
      validateFields
    ],
    CourseController.addCourse)

module.exports = router;
