import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   const location = useLocation(); //url da página

   useEffect(() => {
      const token = localStorage.getItem("userToken");

      if (token) {
         setIsLoggedIn(true);
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
