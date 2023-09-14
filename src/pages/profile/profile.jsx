import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import "./profile.css"

export const Notification = ({ message, onRemove }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setIsVisible(false);
      onRemove();
    },
  });

  return isVisible ? (
    <div className="notification" {...handlers}>
      {message}
    </div>
  ) : null;
};
