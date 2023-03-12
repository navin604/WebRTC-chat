import React from "react";
import P2PListItem from "./p2pListItem";
import { connect } from "react-redux";
import "./p2pRoomList.css";
import P2PRoomButton from "../p2pRoomButton/p2pRoomButton";
import * as p2pCallHandler from "../../../utils/GroupCallHandler";
import LocalVideo from "../localvideo/LocalVideo";
import { callStatus } from "../../../store/Actions/CallActions";

const P2PRoomList = (props) => {
  const { p2pCallRooms, roomName, callState, localStream } = props;
  const createRoom = () => {
    //create room
    console.log("Created p2p call");
    p2pCallHandler.createP2PCall();
  };

  return (
    <div className="room-list-wrapper">
      <div className="room-list-header">
        {roomName === null && callState === callStatus.CALL_AVAILABLE && (
          <P2PRoomButton onClickHandler={createRoom} label="Create Room" />
        )}
      </div>
      <div className="room-list">
        {p2pCallRooms.map((item) => (
          <P2PListItem key={item.roomID} room={item} />
        ))}
      </div>
      {callState === callStatus.CALL_UNAVAILABLE && (
        <LocalVideo localStream={localStream} />
      )}
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

export default connect(mapStateToProps)(P2PRoomList);
