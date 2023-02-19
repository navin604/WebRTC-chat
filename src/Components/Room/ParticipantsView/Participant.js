import React, { useEffect, useRef, useState } from "react";

const Participant = (props) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const videoRef = useRef();
  const audioRef = useRef();

  useEffect(() => {
    props.participant.on("trackSubscribed", trackSubscribed);
    props.participant.on("trackUnsubscribed", trackUnsubscribed);
    setVideoTracks(getVideoTracks(props.participant.videoTracks));
    setAudioTracks(getAudioTracks(props.participant.audioTracks));

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      props.participant.removeAllListeners();
      props.participant.videoTracks.forEach(
        (track) => (track.isEnabled = false)
      );
    };
  }, [props.participant]);

  const getAudioTracks = (audioTrack) => {
    const audioPublications = Array.from(audioTrack.values());

    const existingAudioTracks = audioPublications
      .map((publication) => publication.track)
      .filter((track) => track !== null);
    return existingAudioTracks;
  };

  const getVideoTracks = (videoTrack) => {
    const videoPublications = Array.from(videoTrack.values());

    const existingVideoTracks = videoPublications
      .map((publication) => publication.track)
      .filter((track) => track !== null);
    return existingVideoTracks;
  };

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

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      audioTrack.attach(audioRef.current);
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks]);

  return (
    <div className="person">
      <h3>{props.participant.identity.split(".")[0]}</h3>
      <video ref={videoRef} autoPlay={true} />
      <audio ref={audioRef} autoPlay={true} muted={props.muted} />
    </div>
  );
};

export default Participant;
