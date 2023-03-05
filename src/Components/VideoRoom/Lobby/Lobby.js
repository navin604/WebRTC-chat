import React, { useState } from "react";
import { connect } from "twilio-video";
import { connect as connectRedux } from "react-redux";
import { setRoom } from "../../../store/Actions/DashboardActions";
import "./Lobby.css";
const Lobby = ({ username, setRoomName }) => {
  const [roomName, setRoomNameState] = useState("");
  const [token, setToken] = useState("");

  const handleFormSubmit = async () => {
    console.log(` roomname: ${roomName}`);
    try {
      console.log("Clicked submit, handling form");
      const req = { roomName: roomName, identity: username };
      const response = await fetch("http://localhost:7000/join-room", {
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
      setRoomName(room);
      return room;
    } catch (error) {
      console.log(`error on connect`);
      console.log(error);
    }
    console.log(token)
  };

  return (
    <div className="lobby-wrapper">
      <input
        value={roomName}
        onChange={(e) => {
          setRoomNameState(e.target.value);
        }}
        placeholder="Enter a room name"
      ></input>
      <button value="Submit" onClick={handleFormSubmit}></button>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    setRoomName: (roomName) => dispatch(setRoom(roomName)),
  };
};

const mapStateToProps = ({ dashboard, call }) => ({
  ...dashboard,
  ...call,
});

export default connectRedux(mapStateToProps, mapActionsToProps)(Lobby);
