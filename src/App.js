import React, { useEffect } from "react";
import { connectWithServer } from "./utils/SocketClient";
import "./App.css";
import Login from "./Components/Login/Login";
import { connect } from "react-redux";
import VideoRoom from "./Components/VideoRoom/VideoRoom";

const App = (props) => {
  const { username } = props;
  useEffect(() => {
    connectWithServer();
  }, []);
  return (
    <div className="App">
      {username === "" && <Login />}
      {username !== "" && <VideoRoom />}
    </div>
  );
};
const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
});
export default connect(mapStateToProps)(App);
