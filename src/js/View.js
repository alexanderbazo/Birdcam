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
      this.fullScreen = false;
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
        "[data-resize='true']")
      this.el.style.width = width + "px";
      this.el.style.height = height + "px";

      for (var el in relevantChildren.entries()) {
        console.log(el);
        el.style.width = width + "px";
        el.style.height = height + "px";
        el.width = width;
        el.height = height;
      }
    }

    toggleFullScreen() {

    }
  }

  context.View = View;
}(window));
