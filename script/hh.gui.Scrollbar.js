(function() {
	hh.gui.Scrollbar = function(options) {
		var self = this;
		this._container = document.createElement("div");
		hh.util.addClass(this._container, "b-list__container_scrollbar");

		this._scroller = options.scroller;
		this._content = options.content;
		this._wrapper = options.wrapper;
		this._height = (this._scroller.offsetHeight / this._content.offsetHeight) * this._scroller.offsetHeight;
		this._width = this._scroller.offsetWidth - this._content.offsetWidth;

		this._scrollbar = document.createElement("div");
		hh.util.addClass(this._scrollbar, "b-list_scrollbar");
		this._container.appendChild(this._scrollbar);
		this._scroller.style.width = this._scroller.offsetWidth + this._width + "px";
		this._scrollbar.style.height = this._height - 20 + "px";

		this._wrapper.appendChild(this._container);
		hh.util.addEvent(this._wrapper, "scroll", function() {
			var b = (self._scroller.scrollTop / self._content.offsetHeight) * self._scroller.offsetHeight;
			self._scrollbar.style.top = b + "px";
		});

	}

})();