const { db } = require('../config/database');

class Post {
  // Trovare tutti i post
  static findAll() {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT p.id, p.content, p.created_at, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        ORDER BY p.created_at DESC
      `, (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  // Trovare un post per ID
  static findById(id) {
    return new Promise((resolve, reject) => {
      db.get(`
        SELECT p.id, p.content, p.created_at, p.user_id, u.username
        FROM posts p
        JOIN users u ON p.user_id = u.id
        WHERE p.id = ?
      `, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  // Aggiungi questo metodo alla classe Post

// Eliminare un post
static delete(id) {
     return new Promise((resolve, reject) => {
       db.run('DELETE FROM posts WHERE id = ?', [id], function(err) {
         if (err) {
           return reject(err);
         }
         resolve(this.changes);
       });
     });
   }

  // Trovare i post di un utente
  static findByUserId(userId) {
    return new Promise((resolve, reject) => {
      db.all(`
        SELECT id, content, created_at
        FROM posts
        WHERE user_id = ?
        ORDER BY created_at DESC
      `, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  // Creare un nuovo post
  static create(postData) {
    const { user_id, content } = postData;
    
    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO posts (user_id, content) VALUES (?, ?)',
        [user_id, content],
        function(err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, user_id, content });
        }
      );
    });
  }
}

module.exports = Post;