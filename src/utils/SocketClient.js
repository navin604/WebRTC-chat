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
  socket.on("p2p-call-disconnect", (data) => {
    GroupCallHandler.removeStream(data);
  });
};

export const createP2PCall = (data) => {
  socket.emit("create-group-call", data);
};

export const handleBroadcast = (data) => {
  switch (data.event) {
    case broadcastEventTypes.P2P_CALL_ROOMS:
      const p2pCallRooms = data.p2pCallRooms.filter(
        (room) => room.socketID !== socket.id
      );
      const activeP2PCallID = GroupCallHandler.getCalls();
      if (activeP2PCallID) {
        const room = p2pCallRooms.find(
          (room) => room.roomID === activeP2PCallID
        );
        if (!room) {
          GroupCallHandler.clearP2PData();
        }
      }
      store.dispatch(broadcastActions.setP2PCallRooms(p2pCallRooms));
      break;
    default:
      break;
  }
};

export const joinCall = (data) => {
  console.log("emiting join request to server");
  socket.emit("p2p-call-join-request", data);
};

export const leaveP2PCall = (data) => {
  socket.emit("p2p-call-disconnect", data);
};
export const roomClosed = (data) => {
  socket.emit("room-closed", data);
};
