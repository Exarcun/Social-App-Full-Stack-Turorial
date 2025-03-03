import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { userService } from '../services/api';
import '../styles/Profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Funzione per caricare i dati del profilo
    const loadProfileData = async () => {
      try {
        setLoading(true);
        
        // Carica il profilo utente
        const profileData = await userService.getProfile();
        setUser(profileData);
        
        // Carica i post dell'utente
        const postsData = await userService.getUserPosts();
        setUserPosts(postsData);
        
        setError('');
      } catch (err) {
        setError('Impossibile caricare i dati del profilo. Riprova più tardi.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProfileData();
  }, []);

  if (loading) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-content">
          <div className="loading">Caricamento in corso...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <Navbar />
        <div className="profile-content">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-content">
        {user && (
          <div className="profile-header">
            <div className="profile-avatar">
              {user.username.charAt(0).toUpperCase()}
            </div>
            <div className="profile-info">
              <h2>@{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Membro dal: {new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}

        <div className="profile-posts">
          <h3>I miei post</h3>
          {userPosts.length === 0 ? (
            <p className="no-posts">Non hai ancora pubblicato nulla.</p>
          ) : (
            <div className="posts-list">
              {userPosts.map(post => (
                <div className="post-card" key={post.id}>
                  <div className="post-header">
                    <span className="date">
                      {new Date(post.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="post-content">
                    {post.content}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;