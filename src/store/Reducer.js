import { combineReducers } from "redux";

import callReducer from "./Reducers/CallReducer";
import DashboardReducer from "./Reducers/DashboardReducer";

export default combineReducers({
  dashboard: DashboardReducer,
  call: callReducer,
});
