(function() {

  "use strict";
  
  hh.Observer = function() {

    this._events = {};

    this.fire = function(event) {
      if (typeof this._events[event] === "undefined") {
        return;
      }
      for (var i = 0; i < this._events[event].length; i++) {
        (this._events[event][i].callback).apply(this, arguments);
      }
    };

    this.on = function(event, callback) {
      if (typeof this._events[event] === "undefined") {
        this._events[event] = [];
      }
      this._events[event].push({
        callback: callback
      });
    };
  };

})();