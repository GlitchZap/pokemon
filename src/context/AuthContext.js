import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Current date and user information
  const currentDateTime = "2025-03-06 07:39:13";
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
      // Call the real API endpoint
      const response = await apiLogin({ username, password, userType });
      
      if (response && response.user) {
        const user = {
          id: response.user.id,
          name: response.user.name || currentUserLogin,
          username: response.user.username,
          userType: response.user.userType,
          token: response.token
        };
        
        localStorage.setItem('authToken', user.token);
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        
        if (user.userType === 'student') {
          navigate('/student/dashboard');
        } else if (user.userType === 'admin') {
          navigate('/admin/dashboard');
        }
        
        return true;
      }
      
      return false;
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