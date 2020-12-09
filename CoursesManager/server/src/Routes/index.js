const { Router } = require('express');

const router = Router();

router.use('/auth', require('./auth.routes'));
router.use('/courses', require('./courses.routes'));

module.exports = router;
