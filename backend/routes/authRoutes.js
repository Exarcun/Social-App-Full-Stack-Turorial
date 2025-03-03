const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Rotta per la registrazione: POST /api/auth/register
router.post('/register', authController.register);

// Rotta per il login: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;