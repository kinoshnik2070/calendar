(function () {

    "use strict";

    hh.model.Person = function (options) {

        hh.Model.call(this, arguments);
        
        options = options || {};
        this.name = options.name;
        this.surname = options.surname;
        this.patronymic = options.patronymic;

        this.toString = function () {
            return this.name + " " + this.surname + " " + this.patronymic;
        };
    };

    hh.model.Person._parse = function (str) {
        if (!str) {
            return [];
        }
        if ($.isArray(str)) {
            return str;
        }
        var persons = str.split(","),
            arr = [],
            i,
            len = persons.length,
            person;
        for (i = 0; i < len; i++) {
            person = persons[i].trim().split(" ");
            arr.push(new hh.model.Person({
                name: person[0],
                surname: person[1],
                patronymic: person[3]
            }));
        }
        return arr;
    };

}());