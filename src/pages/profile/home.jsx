import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./profile.css";

const Notification = ({ message, onRemove }) => {
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (
        eventData.dir === "Right" ||
        eventData.dir === "Left" ||
        eventData.dir === "Up"
      ) {
        onRemove();
      }
    },
  });

  return (
    <div className="notification" {...handlers}>
      {message}
    </div>
  );
};

export const App = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (message) => {
    const newNotification = {
      id: Date.now(),
      message: message,
    };

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      newNotification,
    ]);

    setTimeout(() => {
      removeNotification(newNotification.id);
    }, 10000); // Her bir bildirim için 5 saniye sonra otomatik olarak bildirimi kaldır
  };

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((n) => n.id !== id)
    );
  };

  return (
    <div className="app">
      <button onClick={() => addNotification("Bir bildirim metni")}>
        Bildirim Ekle
      </button>
      <div className="notification-container">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            onRemove={() => removeNotification(notification.id)}
          />
        ))}
      </div>
    </div>
  );
};
