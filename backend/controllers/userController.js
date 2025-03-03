const User = require('../models/User');
const Post = require('../models/Post');

// Ottenere il profilo dell'utente
const getProfile = async (req, res) => {
  try {
    // L'utente è già disponibile grazie al middleware di autenticazione
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email,
      created_at: req.user.created_at
    });
  } catch (err) {
    console.error('Errore nel recupero del profilo:', err);
    res.status(500).json({ error: 'Errore nel recupero del profilo' });
  }
};

// Ottenere i post dell'utente
const getUserPosts = async (req, res) => {
  try {
    const posts = await Post.findByUserId(req.userId);
    res.json(posts);
  } catch (err) {
    console.error('Errore nel recupero dei post dell\'utente:', err);
    res.status(500).json({ error: 'Errore nel recupero dei post dell\'utente' });
  }
};

module.exports = {
  getProfile,
  getUserPosts
};