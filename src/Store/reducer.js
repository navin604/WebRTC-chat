import { combineReducers } from "redux";
import dashboardReducer from "./Reducers/dashboardReducer";
import callReducer from "./Reducers/callReducer";
export default combineReducers({
  dashboard: dashboardReducer,
  call: callReducer,
});
