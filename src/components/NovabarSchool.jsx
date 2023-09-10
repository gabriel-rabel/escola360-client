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
    navigate("/login");
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
              <Link to="/school/profile" className="px-4 py-1">Perfil</Link>
                <button onClick={handleLogout} className="px-4 py-1 rounded-md border">
                  Logout
                </button>
              </>
            )}
        </div>
      </div>
    </nav>
  );
}
