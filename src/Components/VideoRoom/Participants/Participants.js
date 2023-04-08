import React, { useEffect, useState } from "react";
import "./Participants.css";
import Participant from "./Participant/Participant";

const Participants = ({ returnToLobby, roomName }) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(roomName.participants.values())
  );

  let gridCol =
    remoteParticipants.length === 1
      ? 1
      : remoteParticipants.length <= 4
      ? 2
      : 4;
  const gridColSize = remoteParticipants.length <= 4 ? 1 : 2;
  let gridRowSize =
    remoteParticipants.length <= 4
      ? remoteParticipants.length
      : Math.ceil(remoteParticipants.length / 2);

  useEffect(() => {
    //addParticipant(room.localParticipant);
    roomName.on("participantConnected", (participant) =>
      addParticipant(participant)
    );
    roomName.on("participantDisconnected", (participant) =>
      removeParticipant(participant)
    );
    window.addEventListener("pagehide", returnToLobby);
    window.addEventListener("beforeunload", returnToLobby);

    //Clean up
    return () => {
      roomName.off("participantConnected", addParticipant);
      roomName.off("participantDisconnected", removeParticipant);
      window.removeEventListener("pagehide", returnToLobby);
      window.removeEventListener("beforeunload", returnToLobby);
    };
  }, []);

  const handleCheck = (participant) => {
    console.log(remoteParticipants.some((item) => item[0] === participant[0]));
    return remoteParticipants.some((item) => item[0] === participant[0]);
  };
  const addParticipant = (participant) => {
    console.log(`${participant} connected!`);
    if (!handleCheck(participant)) {
      setRemoteParticipants((prevParticipants) => [
        ...prevParticipants,
        participant,
      ]);
    }
  };
  const removeParticipant = (participant) => {
    console.log(`${participant} disconnected!`);
    setRemoteParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.identity !== participant.identity)
    );
  };

  return (
    <div
      style={{
        "--grid-size": gridCol,
        "--grid-col-size": gridColSize,
        "--grid-row-size": gridRowSize,
      }}
      className="participants"
    >
      {console.log(`${remoteParticipants}`)}
      {remoteParticipants.map((participant) => (
        <Participant
          key={participant.identity}
          participant={participant}
          muted={false}
        />
      ))}
    </div>
  );
};

export default Participants;
