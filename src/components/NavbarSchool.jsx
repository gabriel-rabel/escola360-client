import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function NavbarSchool() {
  const { isLoggedIn } = useContext(AuthContext);
  
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
      <div className="navbar px-10 flex bg-[#6D7DFF]">
        <Link to="/school">
          <span className="logo"></span>
        </Link>
        <div className="menu">
          <div>
            {isLoggedIn === true && (
              <>
                <Link to="/school/profile" className="px-4 py-1">
                  Perfil
                </Link>
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
