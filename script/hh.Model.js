(function () {

    "use strict";

    hh.Model = function () {
        this.get = function (value) {
            return this[value];
        };

        this.set = function (key, value) {
            this[key] = value;
            return this;
        };

        this.valid = function () {
            return true;
        };
    };

}());