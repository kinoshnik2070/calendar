(function () {

    "use strict";

    hh.store.EventStore = function (options) {
        hh.Store.call(this, options);

        this._keyStore = "event";
        this._data = [];
        this._lastId = 1;

        this._read = function () {

            if (!window.localStorage[this._keyStore]) {
                return;
            }
            var data = JSON.parse(window.localStorage[this._keyStore]),
                i,
                len = data.length;
            for (i = 0; i < len; i++) {
                this.add(new hh.model.Event(data[i]));
            }
        };

        this.save = function () {
            window.localStorage[this._keyStore] = JSON.stringify(this._data);
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
            var i,
                len = this._data.length;
            for (i = 0; i < len; i++) {
                if (this._data[i].id === id) {
                    return true;
                }
            }
            return false;
        };

        this.getByDate = function (date) {
            var searchDate = new Date(date),
                d,
                i,
                len = this._data.length;
            for (i = 0; i < len; i++) {
                d = this._data[i].get("date");
                if (d.getDate() === searchDate.getDate() && d.getMonth() === searchDate.getMonth() && d.getFullYear() === searchDate.getFullYear()) {
                    return this._data[i];
                }
            }
        };

        this.getById = function (id) {
            var i,
                len = this._data.length;
            for (i = 0, len = this._data.length; i < len; i++) {
                if (this._data[i].get("id") === id) {
                    return this._data[i];
                }
            }
        };

        this.getData = function () {
            return this._data;
        };

        this.deleteEvent = function (id) {
            var i,
                len = this._data.length;
            for (i = 0; i < len; i++) {
                if (this._data[i].get("id") === id) {
                    this._data.splice(i, 1);
                    return;
                }
            }
        };

        this._read();
    };
}());