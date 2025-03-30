import { createContext, useContext, useEffect, useState } from "react";
import { API } from "../apiWrapper";
const AuthContext = createContext();

useEffect;
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  const fetchUserDetails = () => {
    try {
      const response = API.get(`/user/profile`);
      console.log(response);
    } catch (err) {
      console.log(err?.response?.data?.error?.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
