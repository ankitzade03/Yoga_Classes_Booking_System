// components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { YogaContext } from '../Context/ContextApi';


export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, role } = useContext(YogaContext);

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not authorized
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // Authorized
  return children;
};
