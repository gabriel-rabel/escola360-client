import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPageUser from "./pages/LoginPageUser";
import LoginPageSchool from "./pages/LoginPageSchool";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import SchoolHomePage from "./pages/SchoolHomePage";
import UserHomePage from "./pages/UserHomePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <Navbar /> */}
      <div className="max-w-7xl ">
        <Routes>
          {/* Rotas que não devem ser protegidas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPageUser />} />
          <Route path="/loginschool" element={<LoginPageSchool />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Rota protegida */}
          <Route
            path="/profile"
            element={<ProtectRoute Component={ProfilePage} />}
          />

          <Route
            path="/school"
            element={<ProtectRoute Component={SchoolHomePage} />}
          />

          <Route
            path="/user"
            element={<ProtectRoute Component={UserHomePage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
