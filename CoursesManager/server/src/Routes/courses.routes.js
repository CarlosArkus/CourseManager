const { Router } = require('express');
// const { check } = require('express-validator');

const CourseController = require('../Controllers/courses.controller');
const { verifyToken } = require('../Middlewares/validateToken');
// const validateFields = require('../Middlewares/validateFields');

const router = Router();

router
  .get('/list', CourseController.getCourses)
  .post(
    '/add',
    [
      verifyToken
    ],
    CourseController.addCourse)

module.exports = router;
