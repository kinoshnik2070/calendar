(function() {

	"use strict";

	hh.gui.DropList = function(options) {

		this._template = "<div class=\"b-list__scroll_container\">" +
			"<div class=\"b-list__scroll\">" +
			"<ul class=\"b-list__event\"></ul>" +
			"</div>" +
			"</div>";
		options.template = this._template;
		options.position = "bottom";
		options.margin = {
			top: 35,
			left: 0
		};
		hh.gui.Popup.call(this, options);
		this._data = [];
		this._tmplItem = options.tmplItem;

		this.renderByData = function(data) {

			this._data = data;
			var str = "";
			for (var i = 0, len = this._data.length; i < len; i++) {
				str += hh.pattern(this._tmplItem, this._data[i]);
			}

			this._container.querySelector(".b-list__event").innerHTML = str;
			this.show();


			var b = {
				scroller: document.querySelector(".b-list__scroll"),
				content: document.querySelector(".b-list__event"),
				wrapper: document.querySelector(".b-list__scroll_container")
			};
			if (!this.scrollbar) {
				this.scrollbar = new hh.gui.Scrollbar(b);
			}
			this.scrollbar.calck();

			if (b.content.offsetHeight < b.scroller.offsetHeight) {
				hh.util.addClass(this._container, "b-popup-none-scoller")
			}
		};

	};
})();