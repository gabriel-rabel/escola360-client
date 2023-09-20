import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotificationList from "../components/NotificationsList";
import api from "../axios/api";
import { Link } from "react-router-dom";
import Voltar from "../assets/voltar.svg";
import formatarData from "../utils/dateFormatter";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getUserNotifications() {
      try {
        const response = await api.get("/notification/get_all");
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUserNotifications();
  }, []);

  notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="w-screen ">
      <Navbar />
      <div className="mt-10 mx-auto w-4/6">
        <div className="flex items-center gap-2 mb-2">
          <Link to="/user">
            <img src={Voltar} />
          </Link>
          <h1 className="text-[18px]">Voltar</h1>
        </div>
        <div className="mt-4">
          <div className="mt-4 max-w-full rounded-md border-gray-300">
            <div className="text-[24px] text-center font-bold h-[30px] flex items-center mb-6">
              <h1>Lista de Notificações</h1>
            </div>

            {/* Tabela */}
            <table className="divide-y divide-gray-200 border-gray-200 scroll-hidden  ">
              <thead >
                <tr >
                  <th
                    scope="col"
                    className="text-left text-md font-medium text-gray-500 tracking-wider"
                  >
                    Título
                  </th>
                  <th
                    scope="col"
                    className="text-left text-md font-medium text-gray-500 tracking-normal py-2"
                  >
                    Descrição
                  </th>
                  <th
                    scope="col"
                    className="flex flex-col items-end py-3 text-right text-md font-medium text-gray-500 tracking-wider"
                  >
                    Data
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {notifications.map((notification) => (
                  <tr key={notification._id}>
                    <td className="py-4 text-md">{notification.title}</td>
                    <td className="py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {notification.description}
                    </td>
                    <td className="flex flex-col items-end py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatarData(notification.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotificationsPage;
