(function () {

    "use strict";

    hh.Observer = function () {

        this._events = {};

        this.fire = function (event) {
            if (this._events[event] === undefined) {
                return;
            }
            var i;
            for (i = 0; i < this._events[event].length; i++) {
                (this._events[event][i].callback).apply(this, Array.prototype.slice.call(arguments, 1));
            }
        };

        this.on = function (event, callback) {
            if (this._events[event] === undefined) {
                this._events[event] = [];
            }
            this._events[event].push({
                callback: callback
            });
        };
    };

}());