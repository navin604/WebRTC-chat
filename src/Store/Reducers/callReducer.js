import * as callActions from "../Actions/callActions";

const initState = {
  callState: callActions.callStates.DISCONNECTED,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case callActions.SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState,
      };
    default:
      return state;
  }
};

export default reducer;
