// components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { SoftContext } from "../../Context/SoftContext";


const ProtectedRoute = ({ children }) => {
  const { token } = useContext(SoftContext);

  if (!token || token === '') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
