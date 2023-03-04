import React, { useEffect, useState } from "react";
import Participant from "./participant";
import "./Room.css"


const Room = ({ returnToLobby, room }) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );
s
  let gridCol =
      remoteParticipants.length === 1 ? 1 : remoteParticipants.length <= 4 ? 2 : 4;
  const gridColSize = remoteParticipants.length <= 4 ? 1 : 2;
  let gridRowSize =
      remoteParticipants.length <= 4
          ? remoteParticipants.length
          : Math.ceil(remoteParticipants.length / 2);



  useEffect(() => {
    //addParticipant(room.localParticipant);
    room.on("participantConnected", (participant) =>
      addParticipant(participant)
    );

    //Clean up
    room.on("participantDisconnected", (participant) =>
      removeParticipant(participant)
    );
    window.addEventListener("pagehide", returnToLobby);
    window.addEventListener("beforeunload", returnToLobby);
  }, [room]);

  const addParticipant = (participant) => {
    console.log(`${participant} connected!`);
    setRemoteParticipants((prevParticipants) => [...prevParticipants, participant])


  };
  const removeParticipant = (participant) => {
    console.log(`${participant} disconnected!`);
    setRemoteParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p.identity !== participant.identity)
    );
  };



  return (
      <div  style={{
        "--grid-size": gridCol,
        "--grid-col-size": gridColSize,
        "--grid-row-size": gridRowSize,
      }} className="participants">
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

export default Room;
