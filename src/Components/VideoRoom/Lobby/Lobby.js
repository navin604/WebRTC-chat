import React, { useState } from "react";
import { connect } from "twilio-video";
import { connect as connectRedux } from "react-redux";
import { setRoom } from "../../../store/Actions/DashboardActions";
import "./Lobby.css";
import debounce from "lodash.debounce";
const Lobby = ({ username, setRoomName }) => {
  const [roomName, setRoomNameState] = useState("");
  const [token, setToken] = useState("");
  const [full, setFull] = useState(false);
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
  const onClick = debounce(handleFormSubmit, 300, true);
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
      console.log(`Room full`);
      console.log(error);
      setFull(true);
      resetFull();
    }
    console.log(token);
  };
  const resetFull = () => {
    setTimeout(() => {
      setFull(false);
    }, 4000);
  };
  return (
    <div className="lobby-wrapper">
      <div className="lobby-prompt">
        <div className="title">
          <h1>Welcome to QuickVid!</h1>
          <p>
            Join a Twilio room via the prompt below, or join a p2p room using
            create room
          </p>
        </div>
        <div className="room-prompt">
          <input
            value={roomName}
            onChange={(e) => {
              setRoomNameState(e.target.value);
            }}
            placeholder="Enter a room name"
          ></input>
          {full === true && <span className="room-error">Room is full!</span>}
          <button className="lobby-button" value="Submit" onClick={onClick}>
            Submit
          </button>
          <br />
        </div>
      </div>
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
