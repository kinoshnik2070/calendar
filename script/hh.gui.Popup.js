hh.gui.Popup = hh.klass(hh.Observer, {

	className: "Popup",

	_construct: function (options) {
		if (typeof options === "undefined") {
			options = {};
		}
		this.margin = {
			left: 15,
			top: 0
		};

		this._template = options.template;
		this._container = document.createElement("div");
		this._close = document.createElement("div");
		this._anchor = null;
		
		hh.util.addClass(this._container, "b-popup");
		hh.util.addClass(this._container, "b-popup__left");

		hh.util.addClass(this._close, "b-popup__close");
		this._container.innerHTML = this._template;
		this._container.appendChild(this._close);
		this._close.innerHTML = "&dagger;";
		this._initEvents();
		this.hide();
		this.parent._construct.apply(this.parent, arguments);
	
	},

	_initEvents: function () {

		var self = this;

		hh.util.addEvent(this._close, "click", function () {
			self.hide();
		});

		hh.util.addEvent(document.body, "click", function (e) {
			var element = e.target;
		
			if (!hh.util.hasClass(self._container, "g-hidden")) {
				while (element !== null) {
					element = element.parentNode;
					if (element === self._container) {
						break;
					} else if(element === null) {
						self.hide();
					}
				}
			}
		});
	},

	render: function () {
		document.body.appendChild(this._container);
	},

	show: function () {
		hh.util.removeClass(this._container, "g-hidden");
	},

	hide: function () {
		hh.util.addClass(this._container, "g-hidden");
		this.fire("hide");
	},

	setAnchor: function (anchor) {
		this._anchor = anchor;
		this._calckPosition();
	},

	_calckPosition: function () {
		if (this._anchor === null) return;
		var sum = this.margin.left + this._anchor.offsetWidth, el = this._anchor;
		while (el != null) { sum += el.offsetLeft; el = el.offsetParent; }
		this._container.style.left = sum + "px";

		var sum = this.margin.top, el = this._anchor;
		while (el != null) { sum += el.offsetTop; el = el.offsetParent; }
		this._container.style.top = sum + "px";
	},

	adjust: function () {
		this._calckPosition();
	}

});