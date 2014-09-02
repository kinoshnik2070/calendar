var hh = {
	pattern: function (text, values) {
		for (var k in values) {
			text = text.replace(new RegExp("\\{" + k + "\\}", "g"), values[k]);
		}
		return text;
	}
};

hh.gui = {};
hh.model = {};
hh.util = {};

hh.LOCAL = {
	ru: {
		dayOfWeek: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
		month: ["Январь", "Ферваль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
	}
};

hh.util = {
	addClass: function (element, className) {
		if (element === null) {
			return;
		}
		element.className += " " + className + " ";
	},

	removeClass: function (element, className) {
		if (element === null) {
			return;
		}
		if (hh.util.hasClass(element, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			element.className = element.className.replace(reg, ' ');
		}
	},

	hasClass: function (element, className) {
		if (element === null) {
			return;
		}
		return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	},

	addEvent: function (element, type, fn) {
		if (element.addEventListener) {
			element.addEventListener(type, fn, true)
			return fn;
		}
		//var iefn = function() { 
		//	fn.call(element) 
		//};
		element.attachEvent('on' + type, fn)
		return fn;
	}
};
/*
hh.Class = function (parent, props) {
	var child, f, i;

	child = function () {
		if (child.uber && child.uber.hasOwnProperty("_construct")) {
			child.uber._construct.apply(this, arguments);
		}
		if (child.prototype.hasOwnProperty("_construct")) {
			child.prototype._construct.apply(this, arguments);
		}
	}

	parent = parent || Object;
	f = function () { };
	f.prototype = parent.prototype;
	child.prototype = new f;
	child.uber = parent.prototype;
	child.prototype.constructor = child;

	for (i in props) {
		if (props.hasOwnProperty(i)) {
			child.prototype[i] = props[i];
		}
	}

	return child;
};*/

hh.klass = function (parent, props) {

	var child = function () {
		this._construct.apply(this, arguments);
	};

	var f, i;
	
	parent = parent || Object;
	f = function () { };
	f.prototype = parent.prototype;
	child.prototype = new f;
	child.prototype.constructor = child;
	child.prototype.parent = parent.prototype;
	
	for (i in props) {
		if (props.hasOwnProperty(i)) {
			child.prototype[i] = props[i];
		}
	}

	return child;
};