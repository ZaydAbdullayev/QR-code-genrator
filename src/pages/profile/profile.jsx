import React from "react";
import "./profile.css";
import { useSwipeable } from "react-swipeable";

const config = {
  delta: 10, // min distance(px) before a swipe starts
  preventDefaultTouchmoveEvent: false, // preventDefault on touchmove, *See Details*
  trackTouch: true, // track touch input
  trackMouse: false, // track mouse input
  rotationAngle: 0, // set a rotation angle
};

export const Profile = () => {
  const handlers = useSwipeable({
    onSwiped: (eventData) => console.log("User Swiped!", eventData),
    ...config,
  });

  return (
    <div className="profile">
      <div {...handlers} style={{ touchAction: "pan-y" }}>
        Swipe here
      </div>
    </div>
  );
};
