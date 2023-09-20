import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { BellIcon } from "@heroicons/react/24/solid";
import api from "../axios/api";

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(false); // Estado para controlar se há notificações não lidas
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserNotifications() {
      try {
        const response = await api.get("/notification/get_unread");
        setNotifications(response.data);

        // Verifique se há notificações não lidas
        const hasUnread = response.data.some(
          (notification) => !notification.read
        );
        setUnreadNotifications(hasUnread);
      } catch (error) {
        console.log(error);
      }
    }

    getUserNotifications();
  }, []);

  function handleLogout(e) {
    e.preventDefault();
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  }

  async function markNotificationsAsRead() {
    try {
      await api.put("/notification/mark_as_read");
      // Após marcar as notificações como lidas, atualize a lista de notificações
      getUserNotifications();
      // Defina o estado como "lido" quando clicar no ícone
      setUnreadNotifications(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav>
      <div className="navbar px-10 flex bg-[#6D7DFF] justify-between items-center">
        <Link to="/">
          <span className="logo"></span>
        </Link>
        <div className="menu flex items-center">
          {isLoggedIn && (
            <>
              <Link
                to="/notifications"
                className="mr-8 flex items-center relative"
                onClick={markNotificationsAsRead}
              >
                <BellIcon className="h-6 w-6" />
                {unreadNotifications && ( // Exiba o número de notificações não lidas apenas se houver notificações não lidas
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
