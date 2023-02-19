import React from "react";
import * as GroupCallHandler from "../../../utils/GroupCallHandler";

const P2PListItem = ({ room }) => {
  const handleJoinRoom = () => {
    //Handle shit
    GroupCallHandler.joinP2PCall(room.socketID, room.roomID);
  };
  return (
    <div onClick={handleJoinRoom}>
      <span>{room.hostname}</span>
    </div>
  );
};

export default P2PListItem;
