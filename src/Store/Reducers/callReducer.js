import * as callActions from "../Actions/callActions";

const initState = {
  callState: callActions.callStates.DISCONNECTED,
  roomName: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case callActions.SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState,
      };
    case callActions.SET_ROOM_NAME:
      return {
        ...state,
        roomName: action.roomName,
      };
    default:
      return state;
  }
};

export default reducer;
