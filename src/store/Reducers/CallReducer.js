import * as callActions from "../Actions/CallActions";

const initState = {
  localStream: null,
  callState: callActions.callStatus.CALL_AVAILABLE,
  p2pCallActive: false,
  p2pCallStreams: [],
  cameraEnabled: true,
  microphoneEnabled: true,
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
        microphoneEnabled: true,
        cameraEnabled: true,
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
    case callActions.CLEAR_P2P_CALL_DATA:
      return {
        ...state,
        p2pCallActive: false,
        p2pCallStreams: [],
        callState: callActions.callStatus.CALL_AVAILABLE,
        microphoneEnabled: true,
        cameraEnabled: true,
      };
    case callActions.SET_LOCAL_CAM_ENABLED:
      return {
        ...state,
        cameraEnabled: action.enabled,
      };
    case callActions.SET_LOCAL_MIC_ENABLED:
      return {
        ...state,
        microphoneEnabled: action.enabled,
      };

    default:
      return state;
  }
};
export default reducer;
