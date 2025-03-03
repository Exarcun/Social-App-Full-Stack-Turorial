const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/Auth');
const userController = require('../controllers/userController');

// Aggiungeremo il controller degli utenti nel prossimo passo

// Rotta per ottenere il profilo dell'utente: GET /api/users/profile
router.get('/profile', authenticate, userController.getProfile);

// Rotta per ottenere i post dell'utente: GET /api/users/posts
router.get('/posts', authenticate, userController.getUserPosts);

module.exports = router;