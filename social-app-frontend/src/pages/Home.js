import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { postService } from '../services/api';
import '../styles/Home.css';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Funzione per caricare i post
    const loadPosts = async () => {
      try {
        setLoading(true);
        const data = await postService.getAllPosts();
        setPosts(data);
        setError('');
      } catch (err) {
        setError('Impossibile caricare i post. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div className="home-page">
      <Navbar />
      <div className="content">
        <h2>Feed Recenti</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Caricamento in corso...</div>
        ) : (
          <div className="posts-container">
            {posts.length === 0 ? (
              <p className="no-posts">Non ci sono ancora post. Sii il primo a pubblicare!</p>
            ) : (
              posts.map(post => (
                <div className="post-card" key={post.id}>
                  <div className="post-header">
                    <span className="username">@{post.username}</span>
                    <span className="date">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="post-content">
                    {post.content}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;