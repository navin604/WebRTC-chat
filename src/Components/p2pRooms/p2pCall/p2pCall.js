import React from "react";
import { connect } from "react-redux";
import P2PRoom from "../p2pRoom";

const P2PCall = (props) => {
  return (
    <>
      <P2PRoom {...props} />
    </>
  );
};

const mapStateToProps = ({ call }) => ({
  ...call,
});

export default connect(mapStateToProps)(P2PCall);
