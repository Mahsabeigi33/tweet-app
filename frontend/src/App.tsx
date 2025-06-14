import { Routes, Route, Navigate } from "react-router-dom"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"  
import Dashboard from "./pages/Dashboard"
import Welcome from "./pages/welcome"
import React from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={isAuthenticated ? <Navigate to="/dashboard"/> : <Welcome />} 
      />
      <Route 
        path="/signup" 
        element={isAuthenticated ? <Navigate to="/dashboard"/> : <Signup />}
      />
      <Route 
        path="/signin" 
        element={isAuthenticated ? <Navigate to="/dashboard"/> : <Signin />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;