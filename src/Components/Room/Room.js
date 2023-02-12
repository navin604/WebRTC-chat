import React from "react";
import { connect } from "react-redux";

const Room = ({ roomName }) => {
  return <div>hello</div>;
};

const mapStateToProps = ({ call }) => {
  return {
    ...call,
  };
};

export default connect(mapStateToProps)(Room);
