import React from "react";
import "./p2pRoom.css";
import P2PStream from "./p2pStream/p2pStream";

const P2PRoom = (props) => {
  const { p2pCallStreams } = props;
  return (
    <div className="group_call_room_container">
      <span className="group_call_title">Group CAll</span>
      <div className="group_call_videos_container">
        {p2pCallStreams.map((stream) => {
          return <P2PStream key={stream.id} stream={stream} />;
        })}
      </div>
    </div>
    //AddToolBar with props
  );
};

export default P2PRoom;
