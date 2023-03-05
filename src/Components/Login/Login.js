import React, { useState } from "react";
import { connect } from "react-redux";
import { setUsername } from "../../store/Actions/DashboardActions";
import "./Login.css";
import ErrorPrompt from "./ErrorPrompt/ErrorPrompt";

const Login = ({ saveUsername }) => {
  const [username, setUsername] = useState("");
  const [error, setErrorStatus] = useState(false);

  const handleLogin = () => {
    if (username === "") {
      setErrorStatus(true);
    }
    console.log("got username, should go to main page");
    saveUsername(username);
  };

  return (
    <div className="login-wrapper">
      <div className="login-prompt">
        <h1>Enter a name</h1>
        <br />
        <br />
        <span className="subtitle">USERNAME:</span>
        <input
          type="text"
          name="username"
          value={username}
          className="login_text"
          onChange={(event) => setUsername(event.target.value)}
        />
        {error && <ErrorPrompt setErrorStatus={setErrorStatus} />}
        <br />
        <button className="login-button" value="SUBMIT" onClick={handleLogin}>
          SUBMIT
        </button>
      </div>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(Login);
