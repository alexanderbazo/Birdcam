/* eslint-env browser */
(function(context) {
  BirdCam.init({
    stream: "/camera/stream.mjpg",
    width: 800,
    height: 480,
  });
}(window));
