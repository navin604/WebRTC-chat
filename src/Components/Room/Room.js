import React, { useEffect, useState } from "react";



const Room = ({ returnToLobby, room }) => {
  const [remoteParticipants, setRemoteParticipants] = useState(
    Array.from(room.participants.values())
  );

  let layoutEl = null;

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
    layoutEl = document.getElementById("layout");
    console.log(`${participant} connected!`);
    let participantEl = document.createElement("div");
    participantEl.setAttribute("id", participant.identity);
    layoutEl.appendChild(participantEl);

    participant.tracks.forEach((trackPublication) => {
      console.log(trackPublication);
      handleTrackPublication(trackPublication, participant);
    });

    // listen for any new track publications
    participant.on("trackPublished", handleTrackPublication);
  };
  const removeParticipant = (participant) => {
    console.log(`${participant} disconnected!`);
    setRemoteParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p.identity !== participant.identity)
    );
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


  return (
    <div className="room_container">
      <div id="layout"></div>
      <button onClick={returnToLobby}>Leave Call</button>
    </div>
  );
};

export default Room;
