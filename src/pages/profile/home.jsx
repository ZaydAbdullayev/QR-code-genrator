import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./profile.css";

const Notification = ({ message, onRemove }) => {
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      if (eventData.dir === "Right" || eventData.dir === "Left") {
        onRemove();
      }
    },
  });

  return (
    <div className="notification" {...handlers} onClick={onRemove}>
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
    }, 10000);
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
