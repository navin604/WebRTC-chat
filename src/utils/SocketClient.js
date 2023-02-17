import socketClient from "socket.io-client";
const SERVER = "http://localhost:7000";
let socket;
export const connectWithServer = () => {
  socket = socketClient(SERVER);

  socket.on("connection", () => {
    console.log("Client: Connected to server");
    console.log(socket.id);
  });
};

export const createGroupCall = (data) => {
  socket.emit("create-group-call", data);
};
