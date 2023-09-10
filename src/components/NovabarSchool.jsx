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
      <div className="flex mx-10 justify-end gap-3">
        <Link to="/">
          <span className=""></span>
        </Link>
        <div className="flex gap-3">
          {isLoggedIn === true && (
            <>
              <Link to="/school/student" className="px-4 py-1">
                Alunos
              </Link>
              <Link to="/school/grade" className="px-4 py-1">
                Matérias
              </Link>
              <Link to="/school/menu" className="px-4 py-1">
                Cardápio
              </Link>
              <Link to="/school/notification" className="px-4 py-1">
                Notificações
              </Link>
              <Link to="/school/report-card" className="px-4 py-1">
                Boletins
              </Link>
              <Link to="/school/profile" className="px-4 py-1">
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
