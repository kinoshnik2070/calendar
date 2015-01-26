var hh = {
	pattern: function(text, values) {
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
	addClass: function(element, className) {
		if (element === null) {
			return;
		}
		element.className += " " + className + " ";
	},

	removeClass: function(element, className) {
		if (element === null) {
			return;
		}
		if (hh.util.hasClass(element, className)) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			element.className = element.className.replace(reg, ' ');
		}
	},

	hasClass: function(element, className) {
		if (element === null) {
			return;
		}
		return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
	},

	addEvent: function(element, type, fn) {
		if (element.addEventListener) {
			element.addEventListener(type, fn, true)
			return fn;
		}
		element.attachEvent('on' + type, fn)
		return fn;
	}
};

hh.extend = function(destination, source) {
	for (var k in source) {
		if (source.hasOwnProperty(k)) {
			destination[k] = source[k];
		}
	}
	return destination;
};