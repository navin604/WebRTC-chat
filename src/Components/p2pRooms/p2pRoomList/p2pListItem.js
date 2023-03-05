import React from "react";
import * as GroupCallHandler from "../../../utils/GroupCallHandler";
import "./p2pRoomListItem.css"
const P2PListItem = ({ room }) => {
  const handleJoinRoom = () => {
    //Handle shit
    GroupCallHandler.joinP2PCall(room.socketID, room.roomID);
  };
  return (
    <div className='group_calls_list_item' onClick={handleJoinRoom}>
      <span>{room.hostname}</span>
    </div>
  );
};

export default P2PListItem;
