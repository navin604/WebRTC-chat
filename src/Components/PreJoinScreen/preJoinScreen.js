import { useState } from "react";
import "./preJoinScreen.css";
import { connect as reactConnect } from "react-redux";
import { setRoomName } from "../../Store/Actions/callActions";
import { setCallState } from "../../Store/Actions/callActions";
import * as callActions from "../../Store/Actions/callActions";

const { connect } = require("twilio-video");

const Entry = ({ saveRoom, setCall }) => {
  const [roomName, setRoomName] = useState("");
  const handleButtonPress = async (e) => {
    e.preventDefault();
    console.log("clicked submit");
    console.log(roomName);
    const req = { roomName: roomName };

    // fetch an Access Token from the join-room route
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

    // join video room with token
    const room = await joinVideoRoom(roomName, token);
    setCall(callActions.callStates.CONNECTED);
    saveRoom(room);
    console.log(`Room is ${room}`);
  };

  const joinVideoRoom = async (roomName, token) => {
    try {
      const room = await connect(token, {
        roomName: roomName,
        audio: true,
        video: true,
      });
      saveRoom(room);
      return room;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form>
        <span>Room Name:</span>
        <input
          type="text"
          name="roomName"
          value={roomName}
          onChange={(e) => {
            setRoomName(e.target.value);
          }}
        />
        <br />
        <input type="button" value="Submit" onClick={handleButtonPress}></input>
      </form>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveRoom: (roomName) => dispatch(setRoomName(roomName)),
    setCall: (callStatus) => dispatch(setCallState(callStatus)),
  };
};

export default reactConnect(null, mapActionsToProps)(Entry);
