import React from "react";

const P2PListItem = ({ room }) => {
  const handleItemPressed = () => {
    //Handle shit
    console.log("PreSsed");
  };
  return (
    <div onClick={handleItemPressed}>
      <span>{room.hostname}</span>
    </div>
  );
};

export default P2PListItem;
