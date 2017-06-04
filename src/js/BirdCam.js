/* eslint-env browser */
var BirdCam = (function() {
  "use strict";
  var that = {},
    viewer,
    content;

  function onStreamLoadingFailed() {
  }

  function onScreenshotAvailable(event) {
    var fileName = "birdcam" + (new Date).getTime() + ".jpg";
    download(event.data, fileName, "image/jpeg");
  }

  function init(config) {
    viewer = new BirdCam.CamViewer({
      width: config.width,
      height: config.height,
    });
    content = document.querySelector("content");
    viewer.appendTo(content);
    viewer.addEventListener("screenshotAvailable", onScreenshotAvailable)
    viewer.addEventListener("streamLoadingFailed", onStreamLoadingFailed);
    viewer.connectToStream(config.stream);
  }

  that.init = init;
  return that;
}());
