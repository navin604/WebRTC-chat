import socketClient from "socket.io-client";
import store from "../store/Store";
import * as broadcastActions from "../store/Actions/DashboardActions";
import * as GroupCallHandler from "./GroupCallHandler";
const SERVER = "http://localhost:7000";
let socket;

const broadcastEventTypes = {
  ACTIVE_USERS: "ACTIVE_USERS",
  P2P_CALL_ROOMS: "P2P_CALL_ROOMS",
};

export const connectWithServer = () => {
  socket = socketClient(SERVER);

  socket.on("connection", () => {
    console.log("Client: Connected to server");
    console.log(socket.id);
  });
  socket.on("broadcast", (data) => {
    handleBroadcast(data);
  });

  socket.on("p2p-call-join-request", (data) => {
    GroupCallHandler.connectToNewUser(data);
  });
};

export const createP2PCall = (data) => {
  socket.emit("create-group-call", data);
};

export const handleBroadcast = (data) => {
  switch (data.event) {
    case broadcastEventTypes.P2P_CALL_ROOMS:
      store.dispatch(broadcastActions.setP2PCallRooms(data.p2pCallRooms));
  }
};

export const joinCall = (data) => {
  console.log("emiting join request to server");
  socket.emit("p2p-call-join-request", data);
};
