const { Router } = require('express');
const CourseController = require('../Controllers/courses.controller');

const router = Router();

/**
 * @swagger
 * /api/courses-list/list:
 *   post:
 *     deprecated: true
 *     tags:
 *       - Courses
 *     summary: Get the courses
 *     description: Get the list of courses listed
 *     responses:
 *       '200':
 *         description: Success
 */
router.get('/list', CourseController.getCourses);

module.exports = router;
