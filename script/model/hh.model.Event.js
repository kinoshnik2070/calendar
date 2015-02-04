(function () {

    "use strict";

    hh.model.Event = function (options) {

        hh.Model.apply(this, arguments);
        
        options = options || {};
        this.id = parseInt(options.id, 10);
        this.title = options.title;
        this.date = options.date ? new Date(options.date) : options.date;
        this.participants = hh.model.Person._parse(options.participants);
        this.description = options.description;
        this.tags = [options.title];

        this.valid = function () {
            if (this.date === undefined || this.date.toString() === "Invalid Date") {
                return false;
            }
            if (this.title === undefined || this.title === "") {
                return false;
            }
            return true;
        };
    };

}());