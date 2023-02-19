import React, { useEffect, useState } from "react";
import Participant from "./ParticipantsView/Participant";
import LocalParticipant from "./ParticipantsView/localParticipant";

import initLayoutContainer from "opentok-layout-js";
const Room = ({ returnToLobby, room }) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );
  //New participants will be appended to this div
  let layoutEl = null;
  //Layout settings
  let layout;
  let ratios = [4 / 3, 3 / 4, 16 / 9];

  useEffect(() => {
    //addParticipant(room.localParticipant);
    room.participants.forEach(addParticipant);
    room.on("participantConnected", (participant) =>
      addParticipant(participant)
    );

    //Clean up
    room.on("participantDisconnected", (participant) =>
      removeParticipant(participant)
    );
    window.addEventListener("pagehide", returnToLobby);
    window.addEventListener("beforeunload", returnToLobby);
  }, [room]);

  const addParticipant = (participant) => {
    function updateLayoutValues() {
      layoutEl = document.getElementById("layout");
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
    console.log(`${participant} connected!`);
    let participantEl = document.createElement("div");
    participantEl.setAttribute("id", participant.identity);
    participantEl.videoHeight = 480;
    // Pick a random ratio
    var ratio = ratios[Math.round(Math.random() * (ratios.length - 1))];
    participantEl.videoWidth = 480 * ratio;

    participantEl.addEventListener("dblclick", function () {
      if (participantEl.classList.contains("OT_big")) {
        participantEl.classList.remove("OT_big");
      } else {
        participantEl.classList.add("OT_big");
      }
      layout();
    });

    layoutEl.appendChild(participantEl);
    layout();
    participant.tracks.forEach((trackPublication) => {
      console.log(trackPublication);
      handleTrackPublication(trackPublication, participant);
    });

    // listen for any new track publications
    participant.on("trackPublished", handleTrackPublication);
  };

  const handleTrackPublication = (trackPublication, participant) => {
    function displayTrack(track) {
      // append this track to the participant's div and render it on the page
      const participantEl = document.getElementById(participant.identity);
      // track.attach creates an HTMLVideoElement or HTMLAudioElement
      // (depending on the type of track) and adds the video or audio stream
      participantEl.append(track.attach());
    }

    // check if the trackPublication contains a `track` attribute. If it does,
    // we are subscribed to this track. If not, we are not subscribed.
    if (trackPublication.track) {
      displayTrack(trackPublication.track);
    }

    // listen for any new subscriptions to this track publication
    trackPublication.on("subscribed", displayTrack);
  };

  const removeParticipant = (participant) => {
    console.log(`${participant} disconnected!`);
  };

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

  return (
    <div className="room_container">
      <div id="layout"></div>
      <button onClick={returnToLobby}>Leave Call</button>
    </div>
  );
};

export default Room;

// Whenever the room changes, set up listeners
