/* eslint-env browser */
/* global download, request */
var BirdCam = (function() {
  "use strict";
  var that = {},
    viewer,
    content;

  function onStreamLoadingFailed() {}

  function onScreenshotAvailable(event) {
    var fileName = "birdcam" + (new Date).getTime() + ".jpg";
    download(event.data, fileName, "image/jpeg");
  }

  function onSoundPlayedOnServer(data) {
    console.log(data);
  }

  function onSoundRequested(event) {
    request({
      url: "api/play",
      success: onSoundPlayedOnServer,
    });
  }

  function init(config) {
    viewer = new BirdCam.CamViewer({
      width: config.width,
      height: config.height,
    });
    content = document.querySelector("content");
    viewer.appendTo(content);
    viewer.addEventListener("screenshotAvailable", onScreenshotAvailable);
    viewer.addEventListener("streamLoadingFailed", onStreamLoadingFailed);
    viewer.addEventListener("soundRequested", onSoundRequested);
    viewer.connectToStream(config.stream);
  }

  that.init = init;
  return that;
}());
