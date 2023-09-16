import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPageUser from "./pages/LoginPageUser";
import LoginPageSchool from "./pages/LoginPageSchool";
import toast, { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/ProtectRoute";
import SchoolHomePage from "./pages/SchoolHomePage";
import UserHomePage from "./pages/UserHomePage";
import HomePage from "./pages/HomePage";
import SchoolGradePage from "./pages/SchoolGradePage";
import SchoolNotificationPage from "./pages/SchoolNotificationPage";
import SchoolStudentPage from "./pages/SchoolStudentPage";
import SchoolMenuPage from "./pages/SchoolMenuPage";
import SchoolReportCardPage from "./pages/SchoolReportCardPage";
import SchoolProfilePage from "./pages/SchoolProfilePage";
import SubjectEditPage from "./pages/SchoolSubjectEditPage";
import SchoolNotificationEdit from "./pages/SchoolNotificationEditPage";
import SchoolSchedulePage from "./pages/SchoolSchedulePage";

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
          <Route path="/signup" element={<SignupPage />} />

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
            path="/school/grade"
            element={<ProtectRoute Component={SchoolGradePage} />}
          />
          <Route
            path="/school/subject-edit/:id_subject"
            element={<ProtectRoute Component={SubjectEditPage} />}
          />

          <Route
            path="/school/notification"
            element={<ProtectRoute Component={SchoolNotificationPage} />}
          />
          <Route
            path="/notification/edit/:id_notification"
            element={<ProtectRoute Component={SchoolNotificationEdit} />}
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
            path="/school/report-card"
            element={<ProtectRoute Component={SchoolReportCardPage} />}
          />
          <Route
            path="/school/profile"
            element={<ProtectRoute Component={SchoolProfilePage} />}
          />
          <Route
            path="/school/schedule"
            element={<ProtectRoute Component={SchoolSchedulePage} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
