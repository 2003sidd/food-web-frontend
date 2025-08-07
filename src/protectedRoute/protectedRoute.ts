import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {type ReactElement } from 'react';

interface ProtectedRouteProps {
  element: ReactElement;
}

const isAuthenticated = () => {
  // Simulate the authentication check (you can replace this with real logic)
  return !!localStorage.getItem('authToken'); // Example: Check if there's an auth token in localStorage
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      // Redirect the user to the login page if not authenticated
      navigate('/login');
    }
  }, [navigate]);

  // If the user is authenticated, render the element (protected page)
  if (!isAuthenticated()) {
    return null; // Return null or loading spinner while redirecting
  }

  return element; // Otherwise, render the protected component
};

export default ProtectedRoute;
