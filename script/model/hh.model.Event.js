(function () {

    "use strict";

    hh.model.Event = function (options) {
        hh.Model.call(this, arguments);
        options = options || {};
        this.id = parseInt(options.id, 10);
        this.title = options.title;
        this.date = options.date ? new Date(options.date) : options.date;
        this.participants = hh.model.Person._parse(options.participants);
        this.description = options.description;
        this.tags = [options.title];
    };

}());