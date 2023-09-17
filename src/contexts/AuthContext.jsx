import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [role, setRole] = useState("");

   const location = useLocation(); //url da página

   useEffect(() => {
      const token = localStorage.getItem("userToken");
      const userRole = localStorage.getItem("userRole")

      if (token) {
         setIsLoggedIn(true);
         setRole(userRole);
      } else {
         setIsLoggedIn(false);
      }
   }, [location]);

   return (
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
         {children}
      </AuthContext.Provider>
   );
}
