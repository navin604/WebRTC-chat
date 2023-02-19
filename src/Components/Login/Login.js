import React, { useState } from "react";
import { connect } from "react-redux";
import { setUsername } from "../../store/Actions/DashboardActions";
import Button from "@mui/material/Button";
import "./Login.css";
import { TextField } from "@mui/material";
import { height } from "@mui/system";

const Login = ({ saveUsername }) => {
  const [username, setUsername] = useState("");

  const handleLogin = () => {
    console.log("got username, should go to main page");
    saveUsername(username);
  };

  return (
    <div className="login_screen">
      <TextField
        id="outlined-basic"
        size="small"
        label={username === "" ? "Username" : ""}
        onFocus={(e) => (e.target.placeholder = "")}
        variant="outlined"
        value={username}
        className="login_text"
        onChange={(event) => setUsername(event.target.value)}
      />
      <Button
        variant="contained"
        className="login_button"
        onClick={handleLogin}
      >
        Start talking!
      </Button>
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(Login);
