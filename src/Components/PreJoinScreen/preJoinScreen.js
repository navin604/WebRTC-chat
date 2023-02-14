import React, { useState } from "react";
import { connect } from "twilio-video";
import Room from "../Room/Room";

const PreJoinScreen = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [room, setRoom] = useState(null);
  const [token, setToken] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(`Username: ${username}. roomname: ${roomName}`);
    try {
      console.log("Clicked submit, handling form");
      const req = { roomName: roomName, identity: username };
      const response = await fetch("http://localhost:8080/join-room", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      });
      const { token } = await response.json();
      console.log(`Received token: ${token}`);
      setToken(token);
      const room = await joinVideoRoom(roomName, token);
      console.log(`Room is :${room}`);
    } catch (err) {
      console.log(err);
    }
  };

  const joinVideoRoom = async (roomName, data) => {
    try {
      const room = await connect(data, {
        roomName: roomName,
        audio: true,
        video: true,
      });
      setRoom(room);
      return room;
    } catch (error) {
      console.log(error);
    }
  };

  const returnToLobby = async () => {
    if (room) {
      // Detach and remove all the tracks
      room.localParticipant.tracks.forEach((publication) => {
        if (
          publication.track.kind === "audio" ||
          publication.track.kind === "video"
        ) {
          publication.track.stop();
          const attachedElements = publication.track.detach();
          attachedElements.forEach((element) => element.remove());
        }
      });

      room.disconnect();
      setRoom(null);
    }
  };

  return (
    <div>
      {room === null ? (
        <form onSubmit={handleFormSubmit}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            placeholder="What is your name?"
          ></input>
          <input
            value={roomName}
            onChange={(e) => {
              setRoomName(e.target.value);
            }}
            placeholder="Enter a room name"
          ></input>
          <button value="Submit" onClick={handleFormSubmit}></button>
        </form>
      ) : (
        <Room returnToLobby={returnToLobby} room={room}></Room>
      )}
    </div>
  );
};

export default PreJoinScreen;
