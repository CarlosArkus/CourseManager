const { Router } = require('express');

const AuthController = require('../Controllers/auth.controller');
const router = Router();

router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.signIn);

module.exports = router;
