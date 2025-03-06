import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ requiredUserType }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (requiredUserType && currentUser.userType !== requiredUserType) {
    // Wrong user type
    return <Navigate to={`/${currentUser.userType}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;