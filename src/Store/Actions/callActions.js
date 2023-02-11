export const SET_CALL_STATE = "SET.CALL_STATE";

export const callStates = {
  DISCONNECTED: "DISCONNECTED",
};

export const setCallState = (callState) => {
  return {
    type: SET_CALL_STATE,
    callState,
  };
};
