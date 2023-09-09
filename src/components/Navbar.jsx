import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Navbar() {
  //acessando as informações do context
  const { isLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");

    navigate("/login");
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link to="/" className="flex">
            <div className="flex-shrink-0 flex justify-center items-center">
              {/*<img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                        alt="Workflow"
                     />
                     <span className="text-lg font-bold ml-2">Escola360</span>*/}
              <div className=" w-20">
                <img src="../public/imagens/logo.jpg" />
              </div>
            </div>
          </Link>
          <div className="flex items-center">
            {isLoggedIn === false && (
              <>
                <Link
                  to="/signup"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign up
                </Link>
                <Link
                  to="/login"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log in
                </Link>
              </>
            )}

            {isLoggedIn === true && (
              <>
                <Link
                  to="/user"
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Perfil
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
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

/* VERSÃO DA NAVBAR SEM AS CLASSES */
/* 
   <nav>
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
