import * as dashboardActions from "../Actions/DashboardActions";

const initState = {
  username: "",
  roomName: null,
  p2pCallRooms: [],
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case dashboardActions.DASHBOARD_SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case dashboardActions.DASHBOARD_SET_P2P_CALL_ROOMS:
      return {
        ...state,
        p2pCallRooms: action.p2pCallRooms,
      };
    case dashboardActions.DASHBOARD_SET_ROOM:
      return {
        ...state,
        roomName: action.roomName,
      };
    default:
      return state;
  }
};
export default reducer;
