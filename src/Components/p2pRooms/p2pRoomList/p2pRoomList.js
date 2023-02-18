import React from "react";
import P2PListItem from "./p2pListItem";
import { connect } from "react-redux";

const P2PRoomList = (props) => {
  const { p2pCallRooms } = props;
  return (
    <>
      {p2pCallRooms.map((item) => (
        <P2PListItem key={item.roomID} room={item} />
      ))}
    </>
  );
};

const mapStateToProps = ({ dashboard }) => ({
  ...dashboard,
});

export default connect(mapStateToProps)(P2PRoomList);
