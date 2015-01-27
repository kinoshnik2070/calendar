(function () {

    "use strict";

    hh.gui.Scrollbar = function (options) {
        this.init = function () {
            var self = this;
            this._container = $("<div></div>");
            this.getLayout().addClass("b-list__container_scrollbar");
            this._scroller = options.scroller;
            this._content = options.content;
            this._wrapper = options.wrapper;
            this._scrollbar = $("<div></div>");
            this._scrollbar.addClass("b-list_scrollbar");
            this._container.append(this._scrollbar);
            this._wrapper.append(this._container);
        };

        this.initEvent = function () {
            this._wrapper.on("scroll", function () {
                var dy = (self._scroller.scrollTop / self._content.offsetHeight) * self._scroller.offsetHeight;
                self._scrollbar.style.top = dy + "px";

            });

            this._scrollbar.on("mousedown", function (event) {
                self._isDown = true;
                self._y = parseInt(event.pageY, 10);

            });

            this._scrollbar.on("mouseup", function () {
                self._isDown = false;
            });

            $(document.body).on("mousemove", function (event) {
                if (self._isDown) {
                    var dy = event.pageY - self._y;
                    self._scroller.scrollTop += (dy / self._scroller.offsetHeight) * self._content.offsetHeight;
                    self._y = event.pageY;
                }
            });
        }

        this.calc = function () {
            this._height = (this._scroller.offsetHeight / this._content.offsetHeight) * this._scroller.offsetHeight;
            this._width = this._scroller.offsetWidth - this._content.offsetWidth;
            this._scroller.width = this._scroller.offsetWidth + this._width + "px";
            this._scrollbar.height = this._height - 20 + "px";
        };

        this.getLayout = function () {
            return $(this._container);
        };

        this.init();
        this.initEvent();
        this.calc();

    }

})();