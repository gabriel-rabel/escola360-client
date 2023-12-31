import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPageUser from "./pages/LoginPageUser";
import LoginPageSchool from "./pages/LoginPageSchool";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/ProtectRoute";
import SchoolHomePage from "./pages/SchoolHomePage";
import UserHomePage from "./pages/UserHomePage";
import HomePage from "./pages/HomePage";
import SchoolNotificationPage from "./pages/SchoolNotificationPage";
import SchoolStudentPage from "./pages/SchoolStudentPage";
import SchoolMenuPage from "./pages/SchoolMenuPage";
import SchoolProfilePage from "./pages/SchoolProfilePage";
import SchoolSchedulePage from "./pages/SchoolSchedulePage";
import NotificationsPage from "./pages/NotificationsPage";

function App() {
  return (
    <div className="flex scroll-hidden bg-white min-h-screen">
      <Toaster />
      {/* <Navbar /> */}
      <div className="max-w-7xl ">
        <Routes>
          {/* Rotas que não devem ser protegidas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPageUser />} />
          <Route path="/loginschool" element={<LoginPageSchool />} />
          {/* Rota protegida */}
          <Route
            path="/school"
            element={<ProtectRoute Component={SchoolHomePage} />}
          />

          <Route
            path="/user"
            element={<ProtectRoute Component={UserHomePage} />}
          />

          <Route
            path="/school/notification"
            element={<ProtectRoute Component={SchoolNotificationPage} />}
          />
          <Route
            path="/school/student"
            element={<ProtectRoute Component={SchoolStudentPage} />}
          />
          <Route
            path="/school/menu"
            element={<ProtectRoute Component={SchoolMenuPage} />}
          />
          <Route
            path="/school/profile"
            element={<ProtectRoute Component={SchoolProfilePage} />}
          />
          <Route
            path="/school/schedule"
            element={<ProtectRoute Component={SchoolSchedulePage} />}
          />
          <Route
            path="/notifications"
            element={<ProtectRoute Component={NotificationsPage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
