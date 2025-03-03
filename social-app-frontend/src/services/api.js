import axios from 'axios';

// URL base dell'API
const API_URL = 'http://localhost:5000/api';

// Crea un'istanza di axios con la URL base
const api = axios.create({
  baseURL: API_URL
});

// Intercettore per aggiungere il token JWT a ogni richiesta
api.interceptors.request.use(
  (config) => {
    // Recupera il token dal localStorage
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servizi di autenticazione
export const authService = {
  // Registrazione utente
  register: async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore di connessione al server' };
    }
  },

  // Login utente
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', {
        email,
        password
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore di connessione al server' };
    }
  },

  // Logout utente
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Ottenere l'utente attualmente loggato
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

// Servizi per i post
export const postService = {
  // Ottenere tutti i post
  getAllPosts: async () => {
    try {
      const response = await api.get('/posts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore nel recupero dei post' };
    }
  },

  // Creare un nuovo post
  createPost: async (content) => {
    try {
      const response = await api.post('/posts', { content });
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore nella creazione del post' };
    }
  },

  // Eliminare un post
  deletePost: async (id) => {
    try {
      const response = await api.delete(`/posts/${id}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore nell\'eliminazione del post' };
    }
  }
};

// Servizi per il profilo utente
export const userService = {
  // Ottenere il profilo dell'utente
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore nel recupero del profilo' };
    }
  },

  // Ottenere i post dell'utente
  getUserPosts: async () => {
    try {
      const response = await api.get('/users/posts');
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Errore nel recupero dei post dell\'utente' };
    }
  }
};

export default api;