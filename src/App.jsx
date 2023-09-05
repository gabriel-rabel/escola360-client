import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import HomePage from "./pages/HomePage";

function App() {
   return (
      <div className="bg-gray-100 min-h-screen">
         <Navbar />
         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
               {/* Rotas que não devem ser protegidas */}
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />

               {/* Rota protegida */}
               <Route
                  path="/profile"
                  element={<ProtectRoute Component={ProfilePage} />}
               />
            </Routes>
         </div>
      </div>
   );
}

export default App;
