import React from "react";
import { connect } from "react-redux";
import P2PRoomButton from "../p2pRoomButton/p2pRoomButton";
import * as p2pCallHandler from "../../../utils/GroupCallHandler";
import P2PRoom from "../p2pRoom";

const P2PCall = (props) => {
  const { callState, localstream } = props;
  const createRoom = () => {
    //create room
    console.log("Created group");
    p2pCallHandler.createP2PCall();
  };

  return (
    <>
      <P2PRoomButton onClickHandler={createRoom} label="Create Room" />
      <P2PRoom />
    </>
  );
};

const mapStateToProps = ({ call }) => ({
  ...call,
});

export default connect(mapStateToProps)(P2PCall);
