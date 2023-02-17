import React from "react";
import P2PListItem from "./p2pListItem";

const testList = [
  { roomId: "a11", hostname: "Mark" },
  { roomId: "a33", hostname: "John" },
  { roomId: "22", hostname: "Frank" },
];

const P2PRoomList = () => {
  return (
    <>
      {testList.map((item) => (
        <P2PListItem key={item.roomId} room={item} />
      ))}
    </>
  );
};

export default P2PRoomList;
