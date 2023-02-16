import React, { useEffect, useState } from "react";
import Participant from "./ParticipantsView/Participant";
import LocalParticipant from "./ParticipantsView/localParticipant";
import "../styles.css";
import initLayoutContainer from "opentok-layout-js";

const Room = ({ returnToLobby, room }) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );
  //New participants will be appended to this div
  let layoutEl = document.getElementById("layout");
  //Layout settings
  let layout;
  let ratios = [4 / 3, 3 / 4, 16 / 9];

  function updateLayoutValues() {
    layout = initLayoutContainer(layoutEl, {
      maxRatio: 3 / 2,
      minRatio: 9 / 16,
      fixedRatio: false,
      alignItems: "center",
      bigPercentage: 0.8,
      bigFixedRatio: false,
      bigMaxRatio: 3 / 2,
      bigMinRatio: 9 / 16,
      bigFirst: true,
      smallMaxWidth: "Infinity",
      smallMaxHeight: "Infinity",
      bigMaxWidth: "Infinity",
      bigMaxHeight: "Infinity",
      bigAlignItems: "center",
      smallAlignItems: "center",
    }).layout;
  }
  updateLayoutValues();
  useEffect(() => {
    room.on("participantConnected", (participant) =>
      addParticipant(participant)
    );
    room.on("participantDisconnected", (participant) =>
      removeParticipant(participant)
    );
  }, [room]);
  const addParticipant = (participant) => {
    console.log(`${participant} connected!`);
    setRemoteParticipants((prevParticipants) => [
      ...prevParticipants,
      participant,
    ]);
    //layout.layout();
  };
  const removeParticipant = (participant) => {
    console.log(`${participant} disconnected!`);
    setRemoteParticipants((prevParticipants) =>
      prevParticipants.filter((p) => p.identity !== participant.identity)
    );
    //layout.layout();
  };

  // function addElement() {
  //   var el = document.createElement("div");
  //   if (useLiveVideo.checked) {
  //     OT.initPublisher(el, {
  //       resolution: "1280x720"
  //     }, function (err) {
  //       layout();
  //     });
  //   } else {
  //     el.videoHeight = 480;
  //     // Pick a random ratio
  //     var ratio = ratios[Math.round(Math.random() * (ratios.length - 1))];
  //     el.videoWidth = 480 * ratio;
  //     el.style.backgroundColor = getRandomColour();
  //   }
  //   el.addEventListener('dblclick', function () {
  //     if (el.classList.contains('OT_big')) {
  //       el.classList.remove('OT_big');
  //     } else {
  //       el.classList.add('OT_big');
  //     }
  //     layout();
  //   });
  //   layoutEl.appendChild(el);
  //   layout();
  // }
  //
  // function removeElement() {
  //   layoutEl.firstChild.classList.remove('ot-layout');
  //   setTimeout(function() {
  //     layoutEl.removeChild(layoutEl.firstChild);
  //     layout();
  //   }, 200);
  // }
  //
  // var resizeTimeout;
  // window.onresize = function() {
  //   clearTimeout(resizeTimeout);
  //   resizeTimeout = setTimeout(function () {
  //     layout();
  //   }, 20);
  // };
  //
  // document.querySelectorAll("input[type='text']").forEach(function(el) {
  //   el.addEventListener('change', function() {
  //     updateLayoutValues();
  //   });
  // });

  return (
    <div className="room_container">
      <div className="room_left">
        <div className="room_content">
          <div id="layout">
            {/*{remoteParticipants.map((participant) => (*/}
            {/*  <Participant*/}
            {/*    key={participant.identity}*/}
            {/*    participant={participant}*/}
            {/*    muted={false}*/}
            {/*  />*/}
            {/*))}*/}
          </div>
          <div>
            {/*<LocalParticipant*/}
            {/*  key={room.localParticipant.identity}*/}
            {/*  participant={room.localParticipant}*/}
            {/*  muted={true}*/}
            {/*/>*/}
          </div>
        </div>
        <div className="room_call_tools">
          <button onClick={returnToLobby}>Leave Call</button>
        </div>
      </div>
      <div className="room_right"></div>
    </div>
  );
};

export default Room;

// Whenever the room changes, set up listeners
