import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com'; // API de ejemplo, reemplaza con tu API real

export const login = async (credentials) => {
  // Implementa la lógica real de autenticación
  return { token: 'fake-token', user: { id: 1, name: 'Admin' } };
};

export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axios.post(`${API_URL}/users`, userData);
  return response.data;
};