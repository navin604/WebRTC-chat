import React, { useRef, useEffect } from "react";
const styles = {
  videoContainer: {
    width: "300px",
    height: "300px",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};
const P2PStream = ({ stream }) => {
  const videoRef = useRef();

  useEffect(() => {
    const remoteStream = videoRef.current;
    remoteStream.srcObject = stream;
    remoteStream.onloadedmetadata = () => {
      remoteStream.play();
    };
  }, [stream]);

  return (
    <div style={styles.videoContainer}>
      <video ref={videoRef} autoPlay style={styles.videoElement} />
    </div>
  );
};

export default P2PStream;
