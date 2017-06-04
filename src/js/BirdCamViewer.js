/* eslint-env browser */
/* global BirdCam */
(function(context) {
  "use strict";
  class BirdCamViewer extends View {
    constructor(options) {
      super({
        width: options.width,
        height: options.height,
        template: BirdCamViewer.HTML,
      });
      this.image = this.el.querySelector(".image");
      this.canvas = this.el.querySelector(".canvas");
      this.hint = this.el.querySelector(".hint");
      this.hint.style["line-height"] = this.height + "px";
      this.tools = this.el.querySelector(".tools");
      this.tools.querySelector(".icon-camera").addEventListener("click",
        this.onScreenshotButtonClicked.bind(this));
      this.tools.querySelector(".icon-resize-full-alt").addEventListener(
        "click", this.onFullscreenButtonClicked.bind(this));
      this.image.onload = this.onStreamLoaded.bind(this);
      this.image.src = options.source;
    }

    onStreamLoaded() {
      this.hint.classList.add("hidden");
      this.image.classList.remove("hidden");
    }

    onScreenshotButtonClicked() {
      this.dispatchEvent({
        type: "screenshotAvailable",
        data: this.currentFrame,
      });
    }

    onFullscreenButtonClicked() {
      this.toggleFullScreen();
    }

    get currentFrame() {
      this.canvas.getContext("2d").drawImage(this.image, 0, 0, this.canvas.width, this.canvas
        .height);
      return this.canvas.toDataURL("image/jpeg", 1.0);
    }
  }

  BirdCamViewer.HTML =
    "<div class='birdcam-viewer'><div class='header'><i class='icon-twitter-bird'></i>BirdCam</div><div class='hint' data-resize='true'>Bitte warten. Die Verbindung zur Kamera wird aufgebaut.</div><img class='image hidden' data-resize='true'/><canvas class='canvas hidden' data-resize='true'></canvas><ul class='tools'><li class='button icon-camera'></li><li class='button icon-resize-full-alt'></li></ul></div>";
  context.CamViewer = BirdCamViewer;

}(BirdCam));
