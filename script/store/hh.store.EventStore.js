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
                i;
            for (i = 0; i < data.length; i++) {
                this.add(new hh.model.Event(data[i]));
            }
            this.fire("load");
        };

        this.save = function () {
            window.localStorage[this._keyStore] = JSON.stringify(this._data);
        };

        this.add = function (data) {
            if (data.valid()) {
                data.set("id", this._getLastId());
                this._data.push(data);
                this.fire("addItem", data);
            } else {
                this.fire("validError");
            }
        };

        this._getLastId = function () {
            while (this._isExistId(this._lastId)) {
                this._lastId++;
            }
            return this._lastId;
        };

        this._isExistId = function (id) {
            var i;
            for (i = 0; i < this._data.length; i++) {
                if (this._data[i].id === id) {
                    return true;
                }
            }
            return false;
        };

        this.getByDate = function (date) {
            var searchDate = new Date(date),
                d,
                i;
            for (i = 0; i < this._data.length; i++) {
                d = this._data[i].get("date");
                if (d.getDate() === searchDate.getDate() && d.getMonth() === searchDate.getMonth() && d.getFullYear() === searchDate.getFullYear()) {
                    return this._data[i];
                }
            }
        };

        this.getById = function (id) {
            var i;
            for (i = 0; i < this._data.length; i++) {
                if (this._data[i].get("id") === id) {
                    return this._data[i];
                }
            }
        };

        this.getData = function () {
            return this._data;
        };

        this.deleteEvent = function (id) {
            var i;
            for (i = 0; i < this._data.length; i++) {
                if (this._data[i].get("id") === id) {
                    this._data.splice(i, 1);
                    this.fire("deleteItem");
                    return;
                }
            }
        };

        this.search = function (str) {
            var i,
                event,
                j,
                reg = new RegExp(str),
                result = [];
            for (i = 0; i < this._data.length; i++) {
                event = this._data[i];
                for (j = 0; j < event.tags.length; j++) {
                    if (reg.test(event.tags[j])) {
                        result.push(event);
                        break;
                    }
                }
            }
            return result;
        };

        this._read();
    };
}());