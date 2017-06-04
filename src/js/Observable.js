/* eslint-env browser */

(function(context) {
  "use strict";

  class Observable {
    constructor() {
      this.listeners = {};
    }

    addEventListener(type, callback) {
      if (!(type in this.listeners)) {
        this.listeners[type] = [];
      }
      this.listeners[type].push(callback);
    }

    removeEventListener(type, callback) {
      if (!(type in this.listeners)) {
        return;
      }
      for (let i = 0, l = this.listeners[type].length; i < l; i++) {
        if (this.listeners[type][i] === callback) {
          this.listeners[type].splice(i, 1);
          return;
        }
      }
    }

    dispatchEvent(event) {
      if (!(event.type in this.listeners)) {
        return;
      }
      event.target = this;
      for (let i = 0, l = this.listeners[event.type].length; i < l; i++) {
        this.listeners[event.type][i].call(this, event);
      }
    }
    
  }

  context.Observable = Observable;

}(window));
