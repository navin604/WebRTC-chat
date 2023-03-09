import React, { useState, useEffect, useRef } from "react";
import Card from "../../Card/Card";
import "./Participant.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophoneSlash } from "@fortawesome/free-solid-svg-icons";

const Participant = ({ participant, muted }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [videoStatus, setVideoStatus] = useState(true);
  const [audioStatus, setAudioStatus] = useState(true);
  const videoRef = useRef();
  const audioRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      videoTrack.on("disabled", () => {
        // do something with the UI here
        console.log("disabled");
        setVideoStatus(false);
      });
      videoTrack.on("enabled", () => {
        // do something with the UI here
        console.log("enabled");
        setVideoStatus(true);
      });

      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);
  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      audioTrack.on("disabled", () => {
        // do something with the UI here
        console.log("disabled");
        setAudioStatus(false);
      });
      audioTrack.on("enabled", () => {
        // do something with the UI here
        console.log("enabled");
        setAudioStatus(true);
      });
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="participant">
      <Card>
        <video ref={videoRef} className="video" autoPlay playsInline></video>
        <audio ref={audioRef} autoPlay={true} muted={muted} />
        {!audioStatus && (
          <FontAwesomeIcon
            className="muted"
            icon={faMicrophoneSlash}
            title="Muted"
          />
        )}
        {!videoStatus && (
          <div
            style={{
              background:
                "rgb(" +
                Math.floor(Math.random() * 255) +
                "," +
                Math.floor(Math.random() * 255) +
                "," +
                Math.floor(Math.random() * 255) +
                ")",
            }}
            className="avatar"
          >
            {participant.identity.split(".")[0][0]}
          </div>
        )}
        <div className="name">{participant.identity.split(".")[0]}</div>
      </Card>
    </div>
  );
};

export default Participant;
