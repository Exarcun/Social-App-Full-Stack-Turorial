const Post = require('../models/Post');

// Ottenere tutti i post
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll();
    res.json(posts);
  } catch (err) {
    console.error('Errore nel recupero dei post:', err);
    res.status(500).json({ error: 'Errore nel recupero dei post' });
  }
};

// Ottenere un post specifico
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post non trovato' });
    }
    res.json(post);
  } catch (err) {
    console.error('Errore nel recupero del post:', err);
    res.status(500).json({ error: 'Errore nel recupero del post' });
  }
};

// Creare un nuovo post
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ error: 'Il contenuto è obbligatorio' });
    }
    
    const newPost = await Post.create({
      user_id: req.userId,
      content
    });
    
    res.status(201).json({
      message: 'Post creato con successo',
      post: newPost
    });
  } catch (err) {
    console.error('Errore nella creazione del post:', err);
    res.status(500).json({ error: 'Errore nella creazione del post' });
  }
};

// Eliminare un post
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post non trovato' });
    }
    
    // Verifica che l'utente sia il proprietario del post
    if (post.user_id !== req.userId) {
      return res.status(403).json({ error: 'Non autorizzato' });
    }
    
    await Post.delete(req.params.id);
    
    res.json({ message: 'Post eliminato con successo' });
  } catch (err) {
    console.error('Errore nell\'eliminazione del post:', err);
    res.status(500).json({ error: 'Errore nell\'eliminazione del post' });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePost
};