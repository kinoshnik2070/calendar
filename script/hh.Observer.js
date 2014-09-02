hh.Observer = hh.klass(null, {

	className: "Observer",
	
	_events: {},

	_construct: function () {
		console.log("construct observer");
	},

	fire: function (event) {
		if(typeof this._events[event] === "undefined") {
			return;
		}
		for (var i = 0; i < this._events[event].length; i++) {
			if(this === this._events[event][i].ctx) {
				(this._events[event][i].callback).apply(this, arguments);
			}
		}
	},

	on: function (event, callback) {
		if (typeof this._events[event] === "undefined") {
			this._events[event] = [];
		}
		this._events[event].push({callback: callback, ctx: this});
	}
});