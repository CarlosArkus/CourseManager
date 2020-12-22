const { Router } = require('express');

const { check } = require('express-validator');

const validateFields = require('../Middlewares/validateFields');

const AuthController = require('../Controllers/auth.controller');
const router = Router();

router
  .post(
    '/signup',
    [
      check('email', 'The email is required'),
      check('name', 'The name is required'),
      check('password', 'The password is required'),
      validateFields
    ],
    AuthController.signUp)
  .post(
    '/signin',
    [
      check('email', 'The email is required'),
      check('password', 'The password is required'),
      validateFields
    ],
    AuthController.signIn);

module.exports = router;
