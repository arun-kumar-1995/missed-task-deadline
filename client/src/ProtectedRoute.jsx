import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // if (isLoading) return <p>Loading...</p>;
  if (!isAuthenticated) return <Navigate to="/account/sign-in" replace />;

  return <>{children}</>;
};
