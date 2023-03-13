import React, { useEffect } from "react";
import axios from "axios";
import "./VideoRoom.css";
import { callStatus } from "../../store/Actions/CallActions";
import Participants from "./Participants/Participants";
import ToolBar from "./Toolbar/ToolBar";
import Lobby from "./Lobby/Lobby";
import { connect } from "react-redux";
import { setRoom } from "../../store/Actions/DashboardActions";
import P2PRoomList from "../p2pRooms/p2pRoomList/p2pRoomList";
import * as GroupCallHandler from "../../utils/GroupCallHandler";
import { getLocalStream } from "../../utils/GetLocalStream";
import P2PCall from "../p2pRooms/p2pCall/p2pCall";
import * as p2pCallHandler from "../../utils/GroupCallHandler";
import {
  setCameraEnabled,
  setMicEnabled,
} from "../../store/Actions/CallActions";
import { setTurnServers } from "../../utils/TURN";

const VideoRoom = (props) => {
  const {
    roomName,
    callState,
    setRoomName,
    cameraEnabled,
    microphoneEnabled,
    localStream,
    setCam,
    setMic,
  } = props;

  useEffect(() => {
    axios
      .get(
        "http://quickvid.westus3.cloudapp.azure.com:7000/api/get-turn-credentials"
      )
      .then((responseData) => {
        console.log(responseData);
        setTurnServers(responseData.data.token.iceServers);
        GroupCallHandler.establishPeerConnection();
        getLocalStream();
      })
      .catch((err) => {
        console.log(err);
      });
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

  const handleDisconnect = () => {
    if (roomName) {
      //leave twilio room
      returnToLobby()
        .then((r) => console.log(r))
        .catch((error) => console.log(`Caught error: ${error}`));
    } else {
      //leave p2p room
      console.log("Leave p2p call");
      p2pCallHandler.leaveCall();
    }
  };

  const callAudioAction = () => {
    const mic = microphoneEnabled;
    setMic(!mic);
    return mic;
  };
  const callVideoAction = () => {
    const camera = cameraEnabled;
    setCam(!camera);
    return camera;
  };

  const handleAudioToggle = () => {
    if (roomName) {
      //Twilio toggle audio
      console.log("Twilio toggle audio");
      twilioAudioTrackEditor();
      callAudioAction();
    } else {
      //leave p2p room
      console.log("Toggle p2p audio");
      const mic = callAudioAction();
      localStream.getAudioTracks()[0].enabled = !mic;
    }
  };
  const handleVideoToggle = () => {
    if (roomName) {
      //Twilio toggle video
      console.log("Twilio toggle video");
      twilioVideoTrackEditor();
      callVideoAction();
    } else {
      //leave p2p room
      console.log("Toggle p2p video");
      const camera = callVideoAction();
      localStream.getVideoTracks()[0].enabled = !camera;
    }
  };

  const twilioVideoTrackEditor = () => {
    if (!cameraEnabled) {
      console.log("Enabling Twilio Video");
      roomName.localParticipant.videoTracks.forEach((publication) => {
        publication.track.enable();
      });
    } else {
      roomName.localParticipant.videoTracks.forEach((publication) => {
        publication.track.disable();
      });
    }
  };
  const twilioAudioTrackEditor = () => {
    if (!microphoneEnabled) {
      console.log("Enabling Twilio Audio");
      roomName.localParticipant.audioTracks.forEach((publication) => {
        publication.track.enable();
      });
    } else {
      roomName.localParticipant.audioTracks.forEach((publication) => {
        publication.track.disable();
      });
    }
  };

  return (
    <div className="wrapper">
      <div className="mainScreen">
        {roomName === null && callState === callStatus.CALL_AVAILABLE && (
          <Lobby />
        )}
        {callState === callStatus.CALL_UNAVAILABLE && <P2PCall />}
        {roomName !== null && (
          <Participants returnToLobby={returnToLobby} roomName={roomName} />
        )}
      </div>
      <div className="roomList">
        <P2PRoomList />
      </div>
      <div className="toolbar">
        <ToolBar
          roomName={roomName}
          handleDisconnect={handleDisconnect}
          handleAudioToggle={handleAudioToggle}
          handleVideoToggle={handleVideoToggle}
        />
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
    setCam: (enabled) => dispatch(setCameraEnabled(enabled)),
    setRoomName: (roomName) => dispatch(setRoom(roomName)),
    setMic: (enabled) => dispatch(setMicEnabled(enabled)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(VideoRoom);
