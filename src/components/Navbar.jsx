import { Link, useNavigate } from "react-router-dom"; // Importe as dependências necessárias
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
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
      <div className="navbar px-10 flex">
        <Link to="/">
          <span className="logo"></span>
        </Link>
        <div className="menu">
          <div>
            {isLoggedIn === true && (
              <>
                <button onClick={handleLogout} className="login-school">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
