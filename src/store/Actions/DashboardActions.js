export const DASHBOARD_SET_USERNAME = "DASHBOARD.SET_USERNAME";

export const DASHBOARD_SET_P2P_CALL_ROOMS = "DASHBOARD.SET_P2P_CALL_ROOMS";

export const setUsername = (username) => {
  return {
    type: DASHBOARD_SET_USERNAME,
    username,
  };
};

export const setP2PCallRooms = (p2pCallRooms) => {
  return {
    type: DASHBOARD_SET_P2P_CALL_ROOMS,
    p2pCallRooms,
  };
};
