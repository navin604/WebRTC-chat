import React, { useEffect } from "react";
import Entry from "./Components/VideoRoom/VideoRoom";
import { connectWithServer } from "./utils/SocketClient";
import "./App.css";
import Login from "./Components/Login/Login";
import { connect } from "react-redux";

const App = (props) => {
  const { username } = props;
  useEffect(() => {
    connectWithServer();
  }, []);
  return (
    <div className="App">
      {username === "" && <Login />}
      {username !== "" && <Entry />}
    </div>
  );
};
const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
});
export default connect(mapStateToProps)(App);
