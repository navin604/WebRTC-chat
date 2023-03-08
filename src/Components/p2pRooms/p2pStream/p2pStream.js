import React, { useRef, useEffect } from "react";
import "../../VideoRoom/Card/Card"
import "../../VideoRoom/Participants/Participant/Participant.css"
import Card from "../../VideoRoom/Card/Card";

const P2PStream = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteStream = videoRef.current;
    remoteStream.srcObject = stream;
    remoteStream.onloadedmetadata = () => {
      remoteStream.play();
    };
  }, [stream]);

  return (
    <div className="participant">
      <Card>
        <video ref={videoRef} className="video" autoPlay playsInline></video>
      </Card>
    </div>
  );
};

export default P2PStream;
