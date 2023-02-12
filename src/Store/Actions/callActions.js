export const SET_CALL_STATE = "SET.CALL_STATE";
export const SET_ROOM_NAME = "SET.ROOM_NAME";

export const callStates = {
  DISCONNECTED: "DISCONNECTED",
  CONNECTED: "CONNECTED",
};

export const setCallState = (callState) => {
  return {
    type: SET_CALL_STATE,
    callState,
  };
};
export const setRoomName = (roomName) => {
  return {
    type: SET_ROOM_NAME,
    roomName,
  };
};
