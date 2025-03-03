const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/Auth');
const postController = require('../controllers/postController');

// Aggiungeremo il controller dei post nel prossimo passo

// Rotta per ottenere tutti i post: GET /api/posts
router.get('/', postController.getAllPosts);

// Rotta per creare un nuovo post: POST /api/posts
router.post('/', authenticate, postController.createPost);

// Rotta per ottenere un post specifico: GET /api/posts/:id
router.get('/:id', postController.getPostById);

// Rotta per eliminare un post: DELETE /api/posts/:id
router.delete('/:id', authenticate, postController.deletePost);

module.exports = router;