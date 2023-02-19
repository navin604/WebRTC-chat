import store from "../store/Store";
import { setLocalStream } from "../store/Actions/CallActions";

const defaultConstraints = {
  video: {
    width: 480,
    height: 360,
  },
  audio: true,
};

export const getLocalStream = () => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      store.dispatch(setLocalStream(stream));
    })
    .catch((err) => {
      console.log("Could not get local stream");
      console.log(err);
    });
};
