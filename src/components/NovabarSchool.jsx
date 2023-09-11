import { Link, useNavigate } from "react-router-dom"; // Importe as dependências necessárias
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavbarSchool() {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    navigate("/");
  }

  return (
    <nav>
      <div className="navbar px-10 flex">
        <Link to="/">
          <span className="logo"></span>
        </Link>
        <div className="menu gap-2">
          {isLoggedIn === true && (
            <>
              <Link
                to="/school/student"
                className="px-4 py-1 rounded-md border"
              >
                Alunos
              </Link>
              <Link to="/school/grade" className="px-4 py-1 rounded-md border">
                Matérias
              </Link>
              <Link to="/school/menu" className="px-4 py-1 rounded-md border">
                Cardápio
              </Link>
              <Link
                to="/school/notification"
                className="px-4 py-1 rounded-md border"
              >
                Notificações
              </Link>
              <Link
                to="/school/report-card"
                className="px-4 py-1 rounded-md border"
              >
                Boletins
              </Link>
              <Link
                to="/school/profile"
                className="px-4 py-1 rounded-md border"
              >
                Perfil
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-md border"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
