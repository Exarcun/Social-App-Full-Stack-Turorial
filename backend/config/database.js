const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Percorso del file database
const dbPath = path.resolve(__dirname, '../database.db');

// Connessione al database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Errore nella connessione al database:', err.message);
  } else {
    console.log('Connessione al database SQLite riuscita');
  }
});

// Funzione per inizializzare il database con le tabelle
function init() {
  db.serialize(() => {
    // Creazione della tabella utenti
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Creazione della tabella posts
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
      )
    `);

    console.log('Tabelle del database inizializzate');
  });
}

module.exports = {
  db,
  init
};