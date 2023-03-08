import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPhoneSlash,
  faVideo,
  faMicrophoneSlash,
  faVideoSlash,
} from "@fortawesome/free-solid-svg-icons";
import "./Toolbar.css";
import { connect } from "react-redux";

const ToolBar = (props) => {
  const {
    microphoneEnabled,
    cameraEnabled,
    handleDisconnect,
    handleVideoToggle,
    handleAudioToggle,
  } = props;
  return (
    <div className="toolbar_items">
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

      <div className="toolbar_icon disconnect">
        <FontAwesomeIcon
          icon={faPhoneSlash}
          title="Disconnect"
          onClick={handleDisconnect}
        />
      </div>
    </div>
  );
};

const mapStatetoProps = ({ call }) => ({
  ...call,
});

export default connect(mapStatetoProps)(ToolBar);
