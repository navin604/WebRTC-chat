import './App.css';
import {useState} from "react";
import Entry from "./Components/Entry";
function App() {

  const x = "disconnected";
  return (
      <div>{x == "disconnected" && <Entry/>}</div>

  );
}

export default App;
