import React, { useEffect } from "react";
import "./VideoRoom.css";
import { callStatus } from "../../store/Actions/CallActions";
import Participants from "./Participants/Participants";
import ToolBar from "./Toolbar/ToolBar"
import Lobby from "./Lobby/Lobby";
import { connect } from "react-redux";
import { setRoom } from "../../store/Actions/DashboardActions";
import P2PRoomList from "../p2pRooms/p2pRoomList/p2pRoomList";
import * as GroupCallHandler from "../../utils/GroupCallHandler";
import { getLocalStream } from "../../utils/GetLocalStream";

const VideoRoom = (props) => {
  const { roomName, callState, setRoomName } = props;

  useEffect(() => {
    GroupCallHandler.establishPeerConnection();
    getLocalStream();
  }, []);


  const returnToLobby = async () => {
    if (roomName) {
      // Detach and remove all the tracks
      roomName.localParticipant.tracks.forEach((publication) => {
        if (
          publication.track.kind === "audio" ||
          publication.track.kind === "video"
        ) {
          publication.track.stop();
          const attachedElements = publication.track.detach();
          attachedElements.forEach((element) => element.remove());
        }
      });

      roomName.disconnect();
      setRoomName(null);
    }
  };

  return (
    <div className="wrapper">
      <div className="mainScreen">
        {roomName === null && callState === callStatus.CALL_AVAILABLE && (
          <Lobby />
        )}
        {callState === callStatus.CALL_UNAVAILABLE && <></>}
        {roomName !== null && (
          <Participants returnToLobby={returnToLobby} roomName={roomName} />
        )}
      </div>
      <div className="roomList"><P2PRoomList/></div>
      <div className="toolbar">
        <ToolBar roomName={roomName} />
      </div>
    </div>
  );
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

const mapActionsToProps = (dispatch) => {
  return {
    setRoomName: (roomName) => dispatch(setRoom(roomName)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(VideoRoom);
