const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const { body } = require('express-validator');
const { validate } = require('../Middleware/validateMiddleware');

//login route and when post request is made in api/auth/login
router.post('/login', [
    body('userName').trim().notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required'),
], validate, authController.login);

module.exports = router;