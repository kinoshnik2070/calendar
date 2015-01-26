function Event(options) {
	Model.call(this, arguments);
	this.id = options.id;
	this.title = options.title;
	this.date = new Date(options.date);
	this.participants = options.participants;
	this.description = options.description;
};

function Person() {
	Model.call(this, arguments);
	this.name = "";
	this.surname = "";
	this.patronymic = "";
};

function Model() {
	this.get = function(value) {
		return this[value];
	};

	this.set = function(key, value) {
		this[key] = value;
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

	this._read = function() {
		if (!localStorage[this._keyStore]) {
			return;
		}
		var data = JSON.parse(localStorage[this._keyStore]);
		if (!data) {
			return;
		}
		for (var i = 0, len = data.length; i < len; i++) {
			this.add(new Event(data[i]));
		}
	};

	this.add = function(data) {
		data.id = this._getLastId();
		this._data.push(data);
	};

	this._getLastId = function() {
		while (this._isExistId(this._lastId)) {
			this._lastId++;
		}
		return this._lastId;
	};

	this._isExistId = function(id) {
		for (var i = 0, len = this._data.length; i < len; i++) {
			if (data[i].id === id) {
				return true;
			}
		}
		return false;
	};

	this.getByDate = function(date) {
		for (var i = 0, len = this._data.length; i < len; i++) {
			var d = this._data[i].get("date");
			if (d.getDate() === date.getDate() &&
				d.getMonth() === date.getMonth() && 
				d.getFullYear() === date.getFullYear()) {
				return this._data[i];
			}
		}
	};

	this._read();
};