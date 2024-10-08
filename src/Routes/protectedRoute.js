import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

// This component checks if the user is authenticated
const ProtectedRoute = ({ children }) => {
  const { userLoggedIn } = useAuth();
  // If the user is not authenticated, redirect to the login page
  if (!userLoggedIn) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the protected content
  return children;
};

export default ProtectedRoute;
