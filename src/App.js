import "./App.css";
import { callStates } from "./Store/Actions/callActions";
import { connect } from "react-redux";
import Entry from "./Components/PreJoinScreen/preJoinScreen";
import Room from "./Components/Room/Room";

const App = ({ callState }) => {
  return (
    <div>
      {callState === callStates.DISCONNECTED && <Entry />}
      {callState === callStates.CONNECTED && <Room />}
    </div>
  );
};

const mapStateToProps = ({ call }) => ({
  ...call,
});

export default connect(mapStateToProps)(App);
