import React from "react";
import "./p2pRoom.css";
import P2PStream from "./p2pStream/p2pStream";
import "../VideoRoom/Participants/Participants.css"


const P2PRoom = (props) => {
  const { p2pCallStreams } = props;


  let gridCol =
    p2pCallStreams.length === 1 ? 1 : p2pCallStreams.length <= 4 ? 2 : 4;
  const gridColSize = p2pCallStreams.length <= 4 ? 1 : 2;
  let gridRowSize =
    p2pCallStreams.length <= 4
      ? p2pCallStreams.length
      : Math.ceil(p2pCallStreams.length / 2);

  return (
    <div  style={{
      "--grid-size": gridCol,
      "--grid-col-size": gridColSize,
      "--grid-row-size": gridRowSize,
    }} className="participants">
      {p2pCallStreams.map((stream) => {
        return <P2PStream key={stream.id} stream={stream} />;
      })}
    </div>
  );
};

export default P2PRoom;
