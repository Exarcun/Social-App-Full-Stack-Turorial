import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      // Chiamata all'API di login
      await authService.login(email, password);
      
      // Reindirizza alla home dopo il login
      navigate('/home');
    } catch (err) {
      setError(err.error || 'Credenziali non valide');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Accedi alla tua area personale</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Accesso in corso...' : 'Accedi'}
        </button>
      </form>
      
      <p>
        Non hai un account? <a href="/register">Registrati</a>
      </p>
    </div>
  );
}

export default Login;