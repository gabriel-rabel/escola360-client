import { Link, useNavigate } from "react-router-dom"; // Importe as dependências necessárias
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BellIcon } from "@heroicons/react/24/solid";
import api from "../axios/api";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  }

  // Função para buscar as notificações do usuário
  useEffect(() => {
    async function getUserNotifications() {
      try {
        const response = await api.get("/notification/get_all");
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (isLoggedIn) {
      getUserNotifications(); // Busque as notificações do usuário se estiver logado
    }
  }, [isLoggedIn]);

  return (
    <nav>
      <div className="navbar px-10 flex justify-between items-center">
        <Link to="/">
          <span className="logo"></span>
        </Link>
        <div className="menu flex items-center">
          {isLoggedIn && (
            <>
              <Link to="/notifications" className="mr-4 flex items-center">
                <BellIcon className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </Link>
              <button onClick={handleLogout} className="login-school">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
