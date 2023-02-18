export const callStatus = {
  CALL_AVAILABLE: "CALL_AVAILABLE",
  CALL_UNAVAILABLE: "CALL_UNAVAILABLE",
};

export const SET_LOCAL_STREAM = "CALL.SET_LOCAL_STREAM";
export const CALL_SET_CALL_STATE = "CALL.SET_CALL_STATE";

export const CALL_RESET_CALL_STATE = "CALL.RESET_CALL_STATE";

export const CALL_CLEAR_GROUP_CALL_DATA = "CALL.CLEAR_GROUP_CALL_DATA";

export const SET_P2P_CALL_ACTIVE = "CALL.SET_P2P_CALL_ACTIVE";
export const SET_P2P_CALL_STREAMS = "CALL.SET_GROUP_CALL_STREAMS";

export const setLocalStream = (localStream) => {
  return {
    type: SET_LOCAL_STREAM,
    localStream,
  };
};

export const setCallState = (callState) => {
  return {
    type: CALL_SET_CALL_STATE,
    callState,
  };
};

export const resetCallDataState = () => {
  return {
    type: CALL_RESET_CALL_STATE,
  };
};

export const setP2PCallActive = (active) => {
  return {
    type: SET_P2P_CALL_ACTIVE,
    active,
  };
};

export const setP2PCallIncomingStreams = (p2pCallStreams) => {
  return {
    type: SET_P2P_CALL_STREAMS,
    p2pCallStreams,
  };
};

export const clearGroupCallData = () => {
  return {
    type: CALL_CLEAR_GROUP_CALL_DATA,
  };
};
