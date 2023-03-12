import React from "react";
import * as callActions from "../../../store/Actions/CallActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPhoneSlash,
  faVideo,
  faMicrophoneSlash,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./ToolBar.css";
import { connect } from "react-redux";

const ToolBar = (props) => {
  const {
    microphoneEnabled,
    cameraEnabled,
    handleDisconnect,
    handleVideoToggle,
    handleAudioToggle,
    roomName,
    callState,
  } = props;
  return (
    <div className="toolbar_items">
      {roomName !== null ? (
        <div className="room-type">
          <p>Twilio Media</p>
        </div>
      ) : (
        callState === callActions.callStatus.CALL_UNAVAILABLE && (
          <div className="room-type">
            <p>P2P Call</p>
          </div>
        )
      )}

      <div
        className={"toolbar_icon " + (!microphoneEnabled ? "disable" : "")}
        onClick={handleAudioToggle}
      >
        <FontAwesomeIcon
          icon={!microphoneEnabled ? faMicrophoneSlash : faMicrophone}
          title={microphoneEnabled ? "Mute Audio" : "Unmute Audio"}
        />
      </div>

      <div
        className={"toolbar_icon " + (!cameraEnabled ? "disable" : "")}
        onClick={handleVideoToggle}
      >
        <FontAwesomeIcon
          icon={!cameraEnabled ? faVideoSlash : faVideo}
          title={cameraEnabled ? "Disable Video" : "Enable Video"}
        />
      </div>

      <div className="toolbar_icon disconnect" onClick={handleDisconnect}>
        <FontAwesomeIcon icon={faPhoneSlash} title="Disconnect" />
      </div>
    </div>
  );
};

const mapStatetoProps = ({ call }) => ({
  ...call,
});

export default connect(mapStatetoProps)(ToolBar);
