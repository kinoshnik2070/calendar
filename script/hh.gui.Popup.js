(function() {

	"use strict";

	hh.gui.Popup = function(options) {

		hh.Observer.call(this, arguments);

		if (typeof options === "undefined") {
			options = {};
		}
		this.closed = options.closed;

		this.margin = options.margin;

		this._template = options.template;
		this._container = document.createElement("div");
		this._close = document.createElement("div");
		this._anchor = null;

		hh.util.addClass(this._container, "b-popup");
		hh.util.addClass(this._container, "b-popup__" + options.position);

		hh.util.addClass(this._close, "b-popup__close");
		this._container.innerHTML = this._template;
		if(this.closed) {
			this._container.appendChild(this._close);
		}

		this._initEvents = function() {

			var self = this;

			hh.util.addEvent(this._close, "click", function() {
				self.hide();
			});

			hh.util.addEvent(document.body, "click", function(e) {
				var element = e.target;

				if (!hh.util.hasClass(self._container, "g-hidden")) {
					while (element !== null) {
						element = element.parentNode;
						if (element === self._container) {
							break;
						} else if (element === null) {
							self.hide();
						}
					}
				}
			});
		};

		this.render = function() {
			if(this.closed) {
				this._container.appendChild(this._close);
			}
			document.body.appendChild(this._container);
		};

		this.show = function() {
			hh.util.removeClass(this._container, "g-hidden");
		};

		this.hide = function() {
			hh.util.addClass(this._container, "g-hidden");
			this.fire("hide");
		};

		this.setAnchor = function(anchor) {
			this._anchor = anchor;
			this._calckPosition();
		};

		this._calckPosition = function() {
			if (this._anchor === null) {
				return
			};
			this._container.style.left = (this._anchor.getBoundingClientRect().left + this.margin.left) + "px";
			this._container.style.top = (this._anchor.getBoundingClientRect().top + this.margin.top + document.body.scrollTop) + "px";
		};

		this.adjust = function() {
			this._calckPosition();
		};

		this._initEvents();
		this.hide();

	};

})();