const express = require('express');
const cors = require('cors');
const db = require('./config/database');

// Inizializzazione dell'app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// Configurazione CORS più dettagliata
app.use(cors({
     origin: 'http://localhost:3000', // L'URL del frontend
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization']
   }));
app.use(express.json());

// Inizializzazione del database
db.init();

// Rotte di base
app.get('/', (req, res) => {
  res.json({ message: 'API SocialApp funzionante' });
});

// Importazione delle rotte
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');

// Utilizzo delle rotte
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

// Gestione errori globale
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Si è verificato un errore!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);
});