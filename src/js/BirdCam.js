/* eslint-env browser */
var BirdCam = (function() {
  "use strict";
  var that = {},
    viewer,
    content;

  function onScreenshotAvailable(event) {
    var fileName = "birdcam" + (new Date).getTime() + ".jpg";
    download(event.data, fileName, "image/jpeg");
  }

  function init(config) {
    viewer = new BirdCam.CamViewer(config);
    content = document.querySelector("content");
    viewer.appendTo(content);
    viewer.addEventListener("screenshotAvailable", onScreenshotAvailable)
  }

  that.init = init;
  return that;
}());
