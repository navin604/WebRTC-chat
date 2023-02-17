import React from "react";
import "./p2pRoomButton.css";

const P2PRoomButton = ({ onClickHandler, label }) => {
  return (
    <button onClick={onClickHandler} className="group_call_button">
      {label}
    </button>
  );
};

export default P2PRoomButton;
