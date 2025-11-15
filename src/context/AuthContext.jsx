// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { signin } from "../api/client";

// Create context
const AuthContext = createContext(null);

// Hook to use in components
export function useAuth() {
  return useContext(AuthContext);
}

// Provider component
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // { id, role, email }
  const [loading, setLoading] = useState(true);

  // Load token from localStorage on first render
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      try {
        const payload = JSON.parse(atob(savedToken.split(".")[1]));
        setToken(savedToken);
        setUser({
          id: payload.id,
          role: payload.role,
        });
      } catch (err) {
        console.error("Failed to decode saved token", err);
        localStorage.removeItem("authToken");
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    const data = await signin(email, password);
    const newToken = data.token;

    // Decode token payload
    const payload = JSON.parse(atob(newToken.split(".")[1]));

    setToken(newToken);
    setUser({
      id: payload.id,
      role: payload.role,
      email: email,
    });

    localStorage.setItem("authToken", newToken);
  };

  // Logout
  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("authToken");
  };

  const value = {
    token,
    user,
    loading,
    login,
    logout,
    isAdmin: user?.role === "admin",
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
