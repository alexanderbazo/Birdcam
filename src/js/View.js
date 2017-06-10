/* eslint-env browser */
/* global BirdCam */
(function(context) {
  "use strict";
  class View extends Observable {
    constructor(options) {
      super();
      this.width = options.width;
      this.height = options.height;
      this.el = this.createElement(options.template);
      this.setSize(this.width, this.height);
      document.addEventListener("fullscreenchange", this.onFullScreenChanged
        .bind(this));
      document.addEventListener("mozfullscreenchange", this.onFullScreenChanged
        .bind(this));
      document.addEventListener("msfullscreenchange", this.onFullScreenChanged
        .bind(this));
      document.addEventListener("webkitfullscreenchange", this.onFullScreenChanged
        .bind(this));
    }

    createElement(template) {
      var el = document.createElement("div");
      el.innerHTML = template;
      return el.firstChild;
    }

    appendTo(parent) {
      parent.append(this.el);
    }

    setSize(width, height) {
      var relevantChildren = this.el.querySelectorAll(
        "[data-resize='true']");
      this.el.style.width = width + "px";
      this.el.style.height = height + "px";
      for (let el in relevantChildren.entries()) {
        el.style.width = width + "px";
        el.style.height = height + "px";
        el.width = width;
        el.height = height;
      }
    }

    onFullScreenChanged() {
      var fullScreenIsActivated = this.isFullScreen();
      if (fullScreenIsActivated === true) {
        let ratio = Math.min(window.innerWidth / this.width, window.innerHeight /
          this.height);
        this.setSize(this.width * ratio, this.height * ratio);
      } else {
        this.setSize(this.width, this.height);
      }
    }

    isFullScreen() {
      var isFullScreen = document.fullscreen || document.mozFullScreen ||
        document.msFullScreen || document.webkitIsFullScreen || false;
      return isFullScreen;
    }

    enterFullScreen() {
      var element = this.el;
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      }
    }

    exitFullScreen() {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msCancelFullScreen) {
        document.msCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }

    toggleFullScreen() {
      var fullScreenIsActivated = this.isFullScreen();
      if (fullScreenIsActivated === true) {
        this.exitFullScreen();
      } else {
        this.enterFullScreen();
      }
    }
  }

  context.View = View;
}(window));
