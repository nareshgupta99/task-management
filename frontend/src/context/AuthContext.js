"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {



  const [role, setRole] = useState(null);

  useEffect(()=>{

     const token = document.cookie
  .split("; ")
  .find(row => row.startsWith("token="))
  ?.split("=")[1];

if (token) {
  const decoded = jwtDecode(token);
  console.log(decoded.role);
  setRole(decoded.role)
}

    if (token) {
  const decoded = jwtDecode(token);
  console.log(decoded);
}
   
  })



  const login = (userData) => {
    setRole(userData);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role,login,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook (best practice)
export const useAuth = () => useContext(AuthContext);
