const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Chiave segreta per il JWT
const JWT_SECRET = 'la_tua_chiave_segreta_jwt'; // In un'app reale, usa variabili d'ambiente!

// Middleware per verificare il token JWT
const authenticate = async (req, res, next) => {
  try {
    // Ottieni il token dall'header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Autenticazione richiesta' });
    }
    
    // Verifica il token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Trova l'utente
    const user = await User.findById(decoded.userId);
    
    if (!user) {
      return res.status(401).json({ error: 'Utente non trovato' });
    }
    
    // Aggiungi l'utente alla richiesta
    req.user = user;
    req.userId = user.id;
    
    next();
  } catch (err) {
    res.status(401).json({ error: 'Token non valido' });
  }
};

// Funzione per generare il token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

module.exports = {
  authenticate,
  generateToken,
  JWT_SECRET
};