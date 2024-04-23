// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { CallBackendAsync } from './helpers/apiCaller';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    
    const response = await CallBackendAsync("http://localhost:3011/api/login", "post", {username: username, password: password})
    //TODO add error handling
    if(response.error)
    {
      return { error: response.error};
    }
    const authenticatedUser = { username, token: response.token }; // Example: set the username as the authenticated user
    setUser(authenticatedUser);
    return authenticatedUser;
  };

  const logout = () => {
    // Implement your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
