import * as sc from "./SocketClient";
import store from "../store/Store";
import {
  callStatus,
  setCallState,
  setP2PCallActive,
  setP2PCallIncomingStreams,
} from "../store/Actions/CallActions";

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

  peer.on("call", (call) => {
    call.answer(store.getState().call.localStream);
    call.on("stream", (callerStream) => {
      const streams = store.getState().call.p2pCallStreams;
      const stream = streams.find((stream) => stream.id === callerStream.id);
      if (!stream) {
        addVideoStream(callerStream);
      }
    });
  });
};

export const createP2PCall = () => {
  sc.createP2PCall({
    username: store.getState().dashboard.username,
    peerID: peerID,
  });
  store.dispatch(setP2PCallActive(true));
  store.dispatch(setCallState(callStatus.CALL_UNAVAILABLE));
};

export const joinP2PCall = (hostID, roomID) => {
  console.log("Joining P2P call");
  const localStream = store.getState().call.localStream;
  sc.joinCall({
    peerID: peerID,
    hostID,
    roomID,
    localStreamID: localStream.id,
  });
};

export const connectToNewUser = (data) => {
  const localStream = store.getState().call.localStream;
  const call = peer.call(data.peerID, localStream);
  call.on("stream", (callerStream) => {
    const streams = store.getState().call.p2pCallStreams;
    const stream = streams.find((stream) => stream.id === callerStream.id);
    if (!stream) {
      addVideoStream(callerStream);
    }
  });
};

export const addVideoStream = (stream) => {
  const p2pCallStreams = [...store.getState().call.p2pCallStreams, stream];

  store.dispatch(setP2PCallIncomingStreams(p2pCallStreams));
};
