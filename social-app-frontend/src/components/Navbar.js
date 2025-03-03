import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const currentUser = authService.getCurrentUser();
  
  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/home">SocialApp</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/profile">Profilo</Link></li>
        <li><Link to="/create">Pubblica</Link></li>
      </ul>
      <div className="navbar-user">
        {currentUser && (
          <span className="username">@{currentUser.username}</span>
        )}
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;