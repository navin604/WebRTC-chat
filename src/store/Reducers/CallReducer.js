import * as callActions from "../Actions/CallActions";

const initState = {
  localStream: null,
  callState: callActions.callStatus.CALL_UNAVAILABLE,
  p2pCallActive: false,
  p2pCallStreams: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case callActions.SET_LOCAL_STREAM:
      return {
        ...state,
        localStream: action.localStream,
      };
    case callActions.CALL_SET_CALL_STATE:
      return {
        ...state,
        callState: action.callState,
      };
    case callActions.CALL_RESET_CALL_STATE:
      return {
        ...state,
        remoteStream: null,
        screenSharingActive: false,
        callerUsername: "",
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
        callingDialogVisible: false,
      };
    case callActions.SET_P2P_CALL_ACTIVE:
      return {
        ...state,
        p2pCallActive: action.active,
      };
    case callActions.SET_P2P_CALL_STREAMS:
      return {
        ...state,
        p2pCallStreams: action.p2pCallStreams,
      };
    case callActions.CALL_CLEAR_GROUP_CALL_DATA:
      return {
        ...state,
        p2pCallActive: false,
        p2pCallStreams: [],
        callState: callActions.callStatus.CALL_AVAILABLE,
        localMicrophoneEnabled: true,
        localCameraEnabled: true,
      };

    default:
      return state;
  }
};
export default reducer;
