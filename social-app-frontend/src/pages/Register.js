import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione
    if (password !== confirmPassword) {
      setError('Le password non corrispondono');
      return;
    }
    
    try {
      setIsLoading(true);
      setError('');
      
      // Chiamata all'API di registrazione
      await authService.register(username, email, password);
      
      // Reindirizza alla home dopo la registrazione
      navigate('/home');
    } catch (err) {
      setError(err.error || 'Si è verificato un errore durante la registrazione');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crea un nuovo account</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        
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
        
        <div className="form-group">
          <label>Conferma Password:</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            disabled={isLoading}
          />
        </div>
        
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registrazione in corso...' : 'Registrati'}
        </button>
      </form>
      
      <p>
        Hai già un account? <a href="/login">Accedi</a>
      </p>
    </div>
  );
}

export default Register;