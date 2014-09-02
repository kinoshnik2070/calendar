var calendar = new hh.gui.Calendar();

var addEventPopup = new hh.gui.Popup({
	template: document.getElementById("popup-add-template").innerHTML
});

var faseEventPopup = new hh.gui.Popup({
	template: document.getElementById("popup-fast-add-template").innerHTML
});

var resultSearchList = new hh.gui.DropList({
	tmplItem: "<li class=\"b-list__event_item\"> {title}  </li>"
});


faseEventPopup.render();
addEventPopup.render();
resultSearchList.render();
calendar.render();


addEventPopup.on("hide", function () {
	calendar.deselect();
});

calendar.on("select", function (event, a) {
	addEventPopup.setAnchor(a.target);
	addEventPopup.show();
});


window.onresize = function () {
	addEventPopup.adjust();
	faseEventPopup.adjust();
};




hh.util.addEvent(document.querySelector(".b-button"), "click", function (event) {
	var data = [
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" },
			{ title: "abc" }, { title: "abc" }, { title: "abc" }
	];
	resultSearchList.setAnchor(event.target);
	resultSearchList.renderByData(data);
});

/**
 * Создает классы
 * @param  {Function} parent Класс от которого наследуется
 * @param  {Object} props  Свойства и методы класса
 * @return {Function}        Итоговый класс
 */




/*
var Popup = hh.klass(Observer, {
	_construct: function (options) {
		console.log("construct popup");
		this._template = options.template;
		this.parent._construct.apply(this.parent, arguments);
	},
	show: function () { },
	hide: function() { }
});

var DropList = hh.klass(Popup, {
	_construct: function (options) {
		console.log("construct droplist");
		options.template = "tempalte popup";
		this._templateItem = options.templateItem;
		this.parent._construct.apply(this.parent, arguments);
	}
});

var a = new DropList({});
var b = new DropList({
	templateItem: "123"
});
a.on("click", function () {
	console.log("click a");
});
a.on("hide", function () {
	console.log("hide a");
});
b.on("hide", function () {
	console.log("hide b");
});

/*
var foo = function () {
	this._events = {};
};

//foo.prototype._events = {};

foo.prototype.on = function (event, func) {
	this._events[event] = func;
};

var a = new foo;
var b = new foo;

a.on("click", function () { });
b.on("hide", function () { });*/


/*
var mixin = function (child, parent) {
	for(var key in parent) {
		if(parent.hasOwnProperty(key)) {
			child[key] = parent[key];
		}
	}
};

var Observer = function () {
};

Observer.prototype._events = [];

Observer.prototype.on = function (event, callback) {
	if (typeof this._events[event] === "undefined") {
		this._events[event] = [];
	}
	this._events[event].push({callback: callback, ctx: this});
};

Observer.prototype.fire = function (event) {
	for (var i = 0; i < this._events[event].length; i++) {
		if(this === this._events[event][i].ctx) {
			(this._events[event][i].callback)();
		}
	}
};

var Popup = function() {};

Popup.prototype.show = function() {};

mixin(Popup.prototype, Observer.prototype);*/


