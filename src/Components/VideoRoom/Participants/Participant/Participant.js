import React from "react";
import "./Participant.css";
import Card from "../../Card/Card.js";
const Participant = () => {
  return (
    <div className="participant">
      <Card>
        <video className="video" autoPlay playsInline></video>
        <div className="avatar">A</div>
        <div className="name">Test User</div>
      </Card>
    </div>
  );
};

export default Participant;
