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

/* <nav>
      <div>
         <Link to="/">
            <div>
               <img
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
               />
               <span>Dev Suport</span>
            </div>
         </Link>
         <div>
            {isLoggedIn === false && (
               <>
                  <Link to="/signup">Sign up</Link>
                  <Link to="/login">Log in</Link>
               </>
            )}

            {isLoggedIn === true && (
               <>
                  <button onClick={handleLogout}>Logout</button>
                  <Link to="/profile">Profile</Link>
               </>
            )}
         </div>
      </div>
   </nav>

 */
