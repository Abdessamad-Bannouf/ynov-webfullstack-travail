const express = require('express');

const authController = require('../controllers/auth');
const validation = require("../middleware/validation");

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', validation('auth'), authController.postLogin);

router.post('/signup', validation('auth'), authController.postSignup);

router.post('/logout', authController.postLogout);

module.exports = router;