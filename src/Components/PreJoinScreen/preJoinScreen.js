import { useState } from "react";
import "./preJoinScreen.css";
import axios from "axios";

const Entry = () => {
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState("");

  const handleButtonPress = (e) => {
    e.preventDefault();
    console.log("clicked submit");
    console.log(roomName);
    const req = { roomName: roomName };
    axios
      .post("http://localhost:8080/join-room", req)
      .then((response) => setToken(response.data.token))
      .catch((error) => {
        console.error("There was an error!", error);
      });

    console.log(`Received token: ${token}`);
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
      </form>
    </div>
  );
};

export default Entry;
