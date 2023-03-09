import React from "react";
import * as GroupCallHandler from "../../../utils/GroupCallHandler";
import "./p2pRoomListItem.css";
import debounce from "lodash.debounce";
const P2PListItem = ({ room }) => {
  const handleJoinRoom = () => {
    //Handle shit
    GroupCallHandler.joinP2PCall(room.socketID, room.roomID);
  };
  const onClick = debounce(handleJoinRoom, 300, true);
  return (
    <div className="group_calls_list_item" onClick={onClick}>
      <span>{room.hostname}</span>
    </div>
  );
};

export default P2PListItem;
