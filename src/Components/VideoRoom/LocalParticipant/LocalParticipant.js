import React, { useRef, useEffect, useState } from "react";
import "./LocalParticipant.css";
const styles = {
  videoContainer: {
    position: "absolute",
    bottom: "4px",
    width: "100%",
    height: "150px",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const LocalParticipant = ({ participant }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const videoRef = useRef();

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      }
    };
    setVideoTracks(trackpubsToTracks(participant.videoTracks));

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);

      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  return (
    <div style={styles.videoContainer} className="vid">
      <video
        style={styles.videoElement}
        ref={videoRef}
        autoPlay
        muted
        playsInline
      />
    </div>
  );
};

export default LocalParticipant;
