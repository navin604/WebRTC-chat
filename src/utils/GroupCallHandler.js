import * as sc from "./SocketClient";
import store from "../store/Store";
import {
  callStatus,
  clearP2PCallData,
  setCallState,
  setP2PCallActive,
  setP2PCallIncomingStreams,
} from "../store/Actions/CallActions";

let peer;
let peerID;
let callRoomID;
let p2pRoomOwner = null;

export const establishPeerConnection = () => {
  peer = new window.Peer(undefined, {
    path: "/peerjs",
    host: "/",
    port: "7000",
  });

  peer.on("open", (ID) => {
    console.log("Connected to peerjs server!");
    peerID = ID;
    console.log(`${peerID}`);
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
  p2pRoomOwner = true;
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
  callRoomID = roomID;
  sc.joinCall({
    peerID: peerID,
    hostID,
    roomID,
    localStreamID: localStream.id,
  });
  store.dispatch(setP2PCallActive(true));
  store.dispatch(setCallState(callStatus.CALL_UNAVAILABLE));
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

export const leaveCall = () => {
  if (p2pRoomOwner) {
    sc.roomClosed({
      peerID: peerID,
    });
  } else {
    sc.leaveP2PCall({
      streamID: store.getState().call.localStream.id,
      roomID: callRoomID,
    });
  }
  clearP2PData();
};

export const clearP2PData = () => {
  callRoomID = null;
  store.dispatch(clearP2PCallData());
  peer.destroy();
  establishPeerConnection();
  p2pRoomOwner = null;
  const localStream = store.getState().call.localStream;
  localStream.getVideoTracks()[0].enabled = true;
  localStream.getAudioTracks()[0].enabled = true;
};
export const removeStream = (data) => {
  const p2pCallStreams = store
    .getState()
    .call.p2pCallStreams.filter((stream) => stream.id !== data.streamID);
  store.dispatch(setP2PCallIncomingStreams(p2pCallStreams));
};

export const getCalls = () => {
  if (store.getState().call.p2pCallActive) {
    return callRoomID;
  } else {
    return false;
  }
};
