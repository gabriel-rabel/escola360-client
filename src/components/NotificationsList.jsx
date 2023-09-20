import React from "react";

function NotificationList({ notifications }) {
  return (
    <div>
      <h2>Suas Notificações:</h2>
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <h3>{notification.title}</h3>
            <p>{notification.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NotificationList;
