import * as sc from "./SocketClient";
import store from "../store/Store";

let peer;
let peerID;

export const establishPeerConnection = () => {
  peer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "7000",
  });

  peer.on("open", (ID) => {
    console.log("Connected to peerjs server!");
    console.log(`${peerID}`);
    peerID = ID;
  });
};

export const createGroupCall = () => {
  sc.createGroupCall({
    username: store.getState().dashboard.username,
    peerID: peerID,
  });
};
