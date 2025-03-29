import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login';
import UserList from './components/Users/UserList';
import UserForm from './components/Users/UserForm';
import PrivateRoute from './components/Auth/PrivateRoute';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// Crear un tema personalizado para Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normaliza los estilos básicos */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="/users" 
            element={
              <PrivateRoute>
                <UserList />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/users/new" 
            element={
              <PrivateRoute>
                <UserForm />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;