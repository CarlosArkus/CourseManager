const { Router } = require('express');

const router = Router();

router.use('/auth', require('./auth.routes'));
router.use('/courses', require('./userCourses.routes'));
router.use('/courses-list', require('./courses.routes'));

module.exports = router;
