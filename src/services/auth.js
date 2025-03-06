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
      const response = await apiLogin({ username, password, userType });
      const user = {
        ...response.data.user,
        token: response.data.token,
        userType,
      };
      
      localStorage.setItem('authToken', response.data.token);
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