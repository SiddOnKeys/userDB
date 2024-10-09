import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();

  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
