import React from "react";
import P2PListItem from "./p2pListItem";
import { connect } from "react-redux";
import "./p2pRoomList.css"
import P2PRoomButton from "../p2pRoomButton/p2pRoomButton";
import P2PRoom from "../p2pRoom";
import * as p2pCallHandler from "../../../utils/GroupCallHandler";
import Participants from "../../VideoRoom/Participants/Participants";
import { callStatus } from "../../../store/Actions/CallActions"

const P2PRoomList = (props) => {
  const { p2pCallRooms, roomName, callState } = props;
  const createRoom = () => {
    //create room
    console.log("Created group");
    p2pCallHandler.createP2PCall();
  };

  const leaveRoom = () => {
    //leave room
    console.log("Leave group");
    p2pCallHandler.leaveCall();
  };


  return (
    <div className="room-list-wrapper">
      <div className="room-list-header">
        {roomName === null && callState === callStatus.CALL_AVAILABLE && (
          <P2PRoomButton onClickHandler={createRoom} label="Create Room" />
        )}

        {callState === callStatus.CALL_UNAVAILABLE && (
          <P2PRoomButton onClickHandler={leaveRoom} label="Leave Room" />
        )}
      </div>
      <div className="room-list">
        {p2pCallRooms.map((item) => (
        <P2PListItem key={item.roomID} room={item} />
      ))}
      </div>
    </div>
  );
};


const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

export default connect(mapStateToProps)(P2PRoomList);

