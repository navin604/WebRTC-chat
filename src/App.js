import React, { useEffect } from "react";
import Entry from "./Components/PreJoinScreen/preJoinScreen";
import { connectWithServer } from "./utils/SocketClient";

const App = () => {
  useEffect(() => {
    connectWithServer();
  }, []);
  return (
    <div>
      <Entry />
    </div>
  );
};

export default App;
