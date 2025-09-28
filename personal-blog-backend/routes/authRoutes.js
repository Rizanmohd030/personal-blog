const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

//login route and when post request is made in api/auth/login
router.post('/login',authController.login);

module.exports = router;