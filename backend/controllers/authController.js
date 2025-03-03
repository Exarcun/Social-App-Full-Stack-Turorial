const User = require('../models/User'); 
const { generateToken } = require('../middleware/Auth.js');

// Registrazione utente
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Verifica se l'email esiste già
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email già registrata' });
    }
    
    // Crea il nuovo utente
    const newUser = await User.create({ username, email, password });
    
    // Genera il token
    const token = generateToken(newUser.id);
    
    res.status(201).json({
      message: 'Utente registrato con successo',
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email
      }
    });
  } catch (err) {
    console.error('Errore nella registrazione:', err);
    res.status(500).json({ error: 'Errore nella registrazione' });
  }
};

// Login utente
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Trova l'utente per email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Credenziali non valide' });
    }
    
    // Verifica la password
    const isMatch = await User.comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Credenziali non valide' });
    }
    
    // Genera il token
    const token = generateToken(user.id);
    
    res.json({
      message: 'Login effettuato con successo',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error('Errore nel login:', err);
    res.status(500).json({ error: 'Errore nel login' });
  }
};

module.exports = {
  register,
  login
};