import React from "react";
import Participant from "./Participant/Participant";
import "./Participants.css";
const Participants = () => {
    const participantKey = 1
    let gridCol =
        participantKey.length === 1 ? 1 : participantKey.length <= 4 ? 2 : 4;
    const gridColSize = participantKey.length <= 4 ? 1 : 2;
    let gridRowSize =
        participantKey.length <= 4
            ? participantKey.length
            : Math.ceil(participantKey.length / 2);


  return (
    <div  style={{
        "--grid-size": gridCol,
        "--grid-col-size": gridColSize,
        "--grid-row-size": gridRowSize,
    }} className="participants">
      <Participant />
      <Participant />
      <Participant />
      <Participant />
    </div>
  );
};

export default Participants;
