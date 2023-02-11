import "./App.css";
import { useState } from "react";
import Entry from "./Components/PreJoinScreen/preJoinScreen";
import { callStates } from "./Store/Actions/callActions";
import { connect } from "react-redux";

function App(callState, username) {
  return <div>{callState != callStates.DISCONNECTED && <Entry />}</div>;
}

const mapStateToProps = ({ call, dashboard }) => ({
  ...call,
  ...dashboard,
});

export default connect(mapStateToProps)(App);
