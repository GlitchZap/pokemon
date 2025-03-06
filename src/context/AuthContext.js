import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { login as apiLogin } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Current date and user information
  const currentDateTime = "2025-03-05 18:38:46";
  const currentUserLogin = "GlitchZap";

  useEffect(() => {
    // Check if user is logged in on page load
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password, userType) => {
    try {
      // In a real app, you'd call your API here
      // For now, let's simulate a successful login
      const user = {
        id: 1,
        name: currentUserLogin,
        username: username,
        userType: userType,
        token: 'fake-jwt-token'
      };
      
      localStorage.setItem('authToken', user.token);
      localStorage.setItem('user', JSON.stringify(user));
      setCurrentUser(user);
      
      if (userType === 'student') {
        navigate('/student/dashboard');
      } else if (userType === 'admin') {
        navigate('/admin/dashboard');
      }
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    login,
    logout,
    isAdmin: currentUser?.userType === 'admin',
    isStudent: currentUser?.userType === 'student',
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;