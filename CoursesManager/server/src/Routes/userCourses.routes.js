const { Router } = require('express');
const { check } = require('express-validator');

const { verifyToken } = require('../Middlewares/validateToken');
const validateFields = require('../Middlewares/validateFields');

const CourseController = require('../Controllers/userCourse.controller');

const router = Router();

router
  /**
  * @swagger
  * /api/courses/list:
  *    get:
  *      tags:
  *       - User Courses
  *      summary: Retrieve a list user courses
  *      description: Get all the user courses
  *      responses:
  *        '200':
  *          description: success
  */
  .get('/list', CourseController.getUsersCourses)
  /**
  * @swagger
  * /api/courses/add:
  *    post:
  *      security:
  *        - apiKeyAuth: []
  *      tags:
  *       - User Courses
  *      summary: Add course to user
  *      description: Add a course to logged user
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                courseID:
  *                  type: string
  *                  description: Course Id (UID)
  *                  example: 5fd016736a4a69d8d34e1d63
  *                time:
  *                  type: number
  *                  description: Time in minutes
  *                  example: 50
  *      responses:
  *        '201':
  *          description: Created
  */
  .post(
    '/add',
    [
      verifyToken,
      check('courseID', 'The Course is required').isMongoId(),
      check('time', 'The time is required').not().isEmpty(),
      validateFields
    ],
    CourseController.addUserCourse)
  /**
  * @swagger
  * /api/courses/update:
  *    put:
  *      security:
  *        - apiKeyAuth: []
  *      tags:
  *       - User Courses
  *      summary: Update user course
  *      description: Update a user course to a logged in user
  *      requestBody:
  *        required: true
  *        content:
  *          application/json:
  *            schema:
  *              type: object
  *              properties:
  *                courseID:
  *                  type: string
  *                  description: Course Id (UID)
  *                  example: 5fd016736a4a69d8d34e1d63
  *                time:
  *                  type: number
  *                  description: Time in minutes
  *                  example: 50
  *                userCourseId:
  *                  type: string
  *                  description: The userCourseId (UID)
  *                  example: 5fd016736a4a69d8d34e1d63
  *      responses:
  *        '200':
  *          description: Updated
  *        '404':
  *          description: User Course not found
  */
  .put(
    '/update',
    [
      verifyToken,
      check('courseID', 'The Course is required').isMongoId(),
      check('time', 'The time is required').not().isEmpty(),
      validateFields
    ],
    CourseController.updateUserCourse)
  /**
  * @swagger
  * /api/courses/delete/:id:
  *    delete:
  *      security:
  *        - apiKeyAuth: []
  *      tags:
  *       - User Courses
  *      summary: Delete user course
  *      description: Delete a user course passing the id by url parameter
  *      parameters:
  *        - in: path
  *          name: id
  *          required: true
  *          description: userCourseId to delete (UID)
  *          schema:
  *           type: string
  *      responses:
  *        '200':
  *          description: Deleted
  *        '404':
  *          description: User Course not found
  */
  .delete(
    '/delete/:id',
    [
      verifyToken,
    ],
    CourseController.deleteUserCourse)

module.exports = router;
