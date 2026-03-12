import axios from 'axios';

const API_URL = import.meta.env.API_URL || 'http://localhost:3333';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


export default api;