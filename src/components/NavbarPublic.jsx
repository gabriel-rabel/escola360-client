import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { UserIcon } from "@heroicons/react/24/outline";

export default function NavbarPublic() {
  const { isLoggedIn } = useContext(AuthContext);
  const userRole = localStorage.getItem("userRole");
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  }

  return (
    <nav>
      <div className="navbar px-10">
        <span className="logo"></span>
        <div className="menu">
          {/* Links NAVBAR */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <a href="mailto:contato@escola360.com.br">Fale Conosco</a>
            {isLoggedIn === false && (
              <>
                <Link to="/loginschool">
                  <button className="login-school">Login School</button>
                </Link>
                <Link to="/login">
                  <button className="login-student">Login Aluno</button>
                </Link>
              </>
            )}
            {isLoggedIn === true && userRole === "USER" && (
              <>
                <Link to="/user" className="flex gap-1 px-4 py-1">
                  <UserIcon className="h-5 w-5 text-white-400" />
                  Minha Conta
                </Link>
                <button onClick={handleLogout} className="login-school">
                  Sair
                </button>
              </>
            )}
            {isLoggedIn === true && userRole === "SCHOOL" && (
              <>
                <Link to="/school" className="flex gap-1 px-4 py-1">
                  <UserIcon className="h-5 w-5 text-white-400" />
                  Minha Conta
                </Link>
                <button onClick={handleLogout} className="login-school">
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
