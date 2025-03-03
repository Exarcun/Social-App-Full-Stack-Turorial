import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { postService } from '../services/api';
import '../styles/CreatePost.css';

function CreatePost() {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('Il contenuto non può essere vuoto');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Chiamata API per creare un nuovo post
      await postService.createPost(content);
      
      // Reindirizza alla home dopo la pubblicazione
      navigate('/home');
    } catch (err) {
      setError(err.error || 'Errore nella pubblicazione del post');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-post-page">
      <Navbar />
      <div className="create-post-content">
        <h2>Crea un nuovo post</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-content">Cosa vuoi condividere?</label>
            <textarea
              id="post-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Scrivi qualcosa..."
              required
              rows={6}
              disabled={isSubmitting}
            />
          </div>
          <button 
            type="submit" 
            className="publish-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Pubblicazione in corso...' : 'Pubblica'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;