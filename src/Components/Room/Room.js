import React, { useEffect, useState } from "react";
import Participant from "./ParticipantsView/Participant";

const Room = ({ returnToLobby, room }) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );
  useEffect(() => {
    room.on("participantConnected", (participant) =>
      addParticipant(participant)
    );
    room.on("participantDisconnected", (participant) =>
      removeParticipant(participant)
    );
  }, [room]);
  const addParticipant = (participant) => {
    console.log(`${participant} connected!`);
    setRemoteParticipants((prevParticipants) => [
      ...prevParticipants,
      participant,
    ]);
  };
  const removeParticipant = (participant) => {
    console.log(`${participant} disconnected!`);
    setRemoteParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.identity !== participant.identity)
    );
  };

  return (
    <div>
      <Participant
        key={room.localParticipant.identity}
        participant={room.localParticipant}
      />
      {remoteParticipants.map((participant) => (
        <Participant key={participant.identity} participant={participant} />
      ))}
      <button onClick={returnToLobby}>Leave Call</button>
    </div>
  );
};

export default Room;

// Whenever the room changes, set up listeners
