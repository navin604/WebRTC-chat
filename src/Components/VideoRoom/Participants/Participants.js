import React from "react";
import Participant from "./Participant/Participant";
import "./Participants.css";
const Participants = () => {
  return (
    <div className="participants">
      <Participant />
      <Participant />
      <Participant />
      <Participant />
    </div>
  );
};

export default Participants;
