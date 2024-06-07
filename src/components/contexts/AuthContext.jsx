import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context for authentication
const AuthContext = createContext();

const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    try {
      // Fetch user data from backend or authentication service
      const fetchUser = async () => {
        // Replace with your actual API call
        const response = await fetch(
          "https://two4-mintep1-app-dev.onrender.com/api/v1/users"
        );
        const userData = await response.json();
        setUser(userData);
      };

      fetchUser();
    } catch (error) {

    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
export { useAuth, AuthProvider };
