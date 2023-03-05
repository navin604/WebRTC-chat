import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPhoneSlash,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import "./Toolbar.css";

const ToolBar = () => {
  return (
    <div className="toolbar_items">
      <div className="toolbar_icon">
        <FontAwesomeIcon icon={faMicrophone} />
      </div>
      <div className="toolbar_icon">
        <FontAwesomeIcon icon={faVideo} />
      </div>
      <div className="toolbar_icon">
        <FontAwesomeIcon icon={faPhoneSlash} />
      </div>
    </div>
  );
};

export default ToolBar;
