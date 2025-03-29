import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com'; // API de prueba

// Almacenamiento en memoria para simular persistencia
let mockUsers = [];
let nextId = 11; // JSONPlaceholder ya tiene 10 usuarios

// Inicializar con usuarios de la API al cargar
(async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    mockUsers = response.data;
    nextId = Math.max(...mockUsers.map(user => user.id)) + 1;
  } catch (error) {
    console.error("Error al cargar usuarios iniciales:", error);
  }
})();

export const login = async (credentials) => {
  // Simulación de login - en producción usaría tu backend real
  if (credentials.email && credentials.password) {
    return { 
      token: 'fake-jwt-token', 
      user: { id: 1, name: 'Admin', email: credentials.email } 
    };
  }
  throw new Error('Credenciales inválidas');
};

export const getUsers = async () => {
  try {
    // Combina usuarios de la API con los creados localmente
    const apiUsers = (await axios.get(`${API_URL}/users`)).data;
    return [...apiUsers, ...mockUsers.filter(mu => !apiUsers.some(au => au.id === mu.id))];
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    return [...mockUsers]; // Devuelve al menos los usuarios locales
  }
};

export const createUser = async (userData) => {
  // Validación básica
  if (!userData.name || !userData.email) {
    throw new Error('Nombre y email son requeridos');
  }

  // Simula delay de red
  await new Promise(resolve => setTimeout(resolve, 500));

  // Crea nuevo usuario con ID autoincremental
  const newUser = {
    id: nextId++,
    name: userData.name,
    email: userData.email,
    username: userData.email.split('@')[0],
    phone: userData.phone || '',
    website: userData.website || '',
    company: {
      name: userData.companyName || ''
    }
  };

  mockUsers.push(newUser);
  return newUser;
};

// Función adicional para desarrollo - limpia usuarios simulados
export const resetMockUsers = () => {
  mockUsers = [];
  nextId = 11;
};