const { Router } = require('express');
const { check } = require('express-validator');

const { verifyToken } = require('../Middlewares/validateToken');
const validateFields = require('../Middlewares/validateFields');

const CourseController = require('../Controllers/userCourse.controller');

const router = Router();

router
  .get('/list', CourseController.getUsersCourses)
  .post(
    '/add',
    [
      verifyToken,
      check('courseID', 'The Course is required').isMongoId(),
      check('time', 'The time is required').not().isEmpty(),
      validateFields
    ],
    CourseController.addUserCourse)
  .put(
    '/update/:id',
    [
      verifyToken,
      check('courseID', 'The Course is required').isMongoId(),
      check('time', 'The time is required').not().isEmpty(),
      validateFields
    ],
    CourseController.updateUserCourse)
  .delete(
    '/delete/:id',
    CourseController.deleteUserCourse)

module.exports = router;
