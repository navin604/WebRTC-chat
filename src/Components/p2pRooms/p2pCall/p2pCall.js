import React from "react";
import { connect } from "react-redux";
import P2PRoomButton from "../p2pRoomButton/p2pRoomButton";
import * as p2pCallHandler from "../../../utils/GroupCallHandler";
import P2PRoom from "../p2pRoom";
import {
  setCameraEnabled,
  setMicEnabled,
} from "../../../store/Actions/CallActions";

const P2PCall = (props) => {
  const { callState, localstream, p2pCallStreams, p2pCallActive } = props;
  const createRoom = () => {
    //create room
    console.log("Created group");
    p2pCallHandler.createP2PCall();
  };

  const leaveRoom = () => {
    //leave room
    p2pCallHandler.leaveCall();
  };

  return (
    <>
      <P2PRoomButton onClickHandler={createRoom} label="Create Room" />
      <P2PRoom {...props} />
      <P2PRoomButton onClickHandler={leaveRoom} label="Leave Room" />
    </>
  );
};

const mapStateToProps = ({ call }) => ({
  ...call,
});

const mapActionsToProps = ({ dispatch }) => {
  return {
    cameraToggle: (enabled) => dispatch(setCameraEnabled(enabled)),
    micToggle: (enabled) => dispatch(setMicEnabled(enabled)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(P2PCall);
