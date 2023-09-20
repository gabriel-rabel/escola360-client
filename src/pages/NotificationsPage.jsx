import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import NotificationList from "../components/NotificationsList";
import api from "../axios/api";

function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function getUserNotifications() {
      try {
        const response = await api.get("/user/notifications");
        setNotifications(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    getUserNotifications();
  }, []);

  return (
    <div>
      <Navbar />
      <NotificationList notifications={notifications} />
    </div>
  );
}

export default NotificationsPage;
