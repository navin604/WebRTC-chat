import { useState } from "react";
import "./preJoinScreen.css";
import axios from "axios";

const Entry = () => {
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState("");

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
    setToken(token);
    console.log(`Received token: ${token}`);
  };

  const handle = () => {
    console.log(token);
  };

  return (
    <div className="joinRoom">
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
        <input type="button" value="Submit2" onClick={handle}></input>
      </form>
    </div>
  );
};

export default Entry;
