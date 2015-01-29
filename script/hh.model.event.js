function Event(options) {
    Model.call(this, arguments);
    options = options || {};
    this.id = parseInt(options.id, 10);
    this.title = options.title;
    this.date = new Date(options.date);
    this.participants = Person._parse(options.participants);
    this.description = options.description;
};

function Person(options) {
    Model.call(this, arguments);
    options = options || {};
    this.name = options.name;
    this.surname = options.surname;
    this.patronymic = options.patronymic;

    this.toString = function() {
        return this.name + " " + this.surname + " " + this.patronymic;
    };
};

Person._parse = function (str) {
    if (!str) {
        return [];
    }
    if($.isArray(str)) {
        return str;
    }
    var persons = str.split(","),
        arr = [];
    for (var i = 0, len = persons.length; i < len; i++) {
        var person = persons[i].trim().split(" ");
        arr.push(new Person({
            name: person[0],
            surname: person[1],
            patronymic: person[3]
        }));
    }
    return arr;
};

function Model() {
    this.get = function (value) {
        return this[value];
        return this;
    };

    this.set = function (key, value) {
        this[key] = value;
        return this;
    };

    this.valid = function() {
        return true;
    };
};

function Store(options) {
    this.model = options.model;
};

function EventStore(options) {
    Store.call(this, arguments);

    this._keyStore = "event";
    this._data = [];
    this._lastId = 0;

    this._read = function () {

        if (!localStorage[this._keyStore]) {
            return;
        }
        var data = JSON.parse(localStorage[this._keyStore]);
        for (var i = 0, len = data.length; i < len; i++) {
            this.add(new Event(data[i]));
        }
    };

    this.save = function () {
        localStorage[this._keyStore] = JSON.stringify(this._data);
    };

    this.add = function (data) {
        data.id = this._getLastId();
        this._data.push(data);
    };

    this._getLastId = function () {
        while (this._isExistId(this._lastId)) {
            this._lastId++;
        }
        return this._lastId;
    };

    this._isExistId = function (id) {
        for (var i = 0, len = this._data.length; i < len; i++) {
            if (this._data[i].id === id) {
                return true;
            }
        }
        return false;
    };

    this.getByDate = function (date) {
        var date = new Date(date);
        for (var i = 0, len = this._data.length; i < len; i++) {
            var d = this._data[i].get("date");
            if (d.getDate() === date.getDate() &&
                d.getMonth() === date.getMonth() &&
                d.getFullYear() === date.getFullYear()) {
                return this._data[i];
            }
        }
    };

    this.getById = function(id) {
        for(var i = 0, len = this._data.length; i < len; i++) {
            if(this._data[i].get("id") === id) {
                return this._data[i];
            }
        }
    };

    this.getData = function () {
        return this._data;
    };

    this._read();
};