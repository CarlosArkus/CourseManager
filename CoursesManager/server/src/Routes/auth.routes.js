const { Router } = require('express');

const { check } = require('express-validator');

const validateFields = require('../Middlewares/validateFields');

const AuthController = require('../Controllers/auth.controller');
const router = Router();

router
/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new user
 *     description: Create a new user in system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of user
 *                 example: Jaun
 *               email:
 *                 type: string
 *                 description: Email of user
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 description: Password of user, at least 6 characters
 *                 example: 123abc
 *     responses:
 *       '201':
 *         description: User created
 *       '400':
 *         description: Email already exists
 */
  .post(
    '/signup',
    [
      check('email', 'The email is required'),
      check('name', 'The name is required'),
      check('password', 'The password is required'),
      validateFields
    ],
    AuthController.signUp)
/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User sign in
 *     description: User sign in
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of user
 *                 example: test@test.com
 *               password:
 *                 type: string
 *                 description: Password of user, at least 6 characters
 *                 example: 123abc
 *     responses:
 *       '200':
 *         description: User signed in
 *       '400':
 *         description: bad Email or password
 */
  .post(
    '/signin',
    [
      check('email', 'The email is required'),
      check('password', 'The password is required'),
      validateFields
    ],
    AuthController.signIn);

module.exports = router;
