(function () {

    "use strict";

    hh.gui.Scrollbar = function (options) {

        function _init() {
            this._container = $("<div></div>");
            this.getLayout().addClass("b-list__container_scrollbar");
            this._scroller = options.scroller;
            this._content = options.content;
            this._wrapper = options.wrapper;
            this._scrollbar = $("<div></div>");
            this._scrollbar.addClass("b-list_scrollbar");
            this._container.append(this._scrollbar);
            this._wrapper.append(this._container);
        }

        function _initEvents() {
            var self = this;
            this._scroller.on("scroll", function () {

                var dy = (self._scroller.scrollTop() / self._content.height()) * self._scroller.height();
                self._scrollbar.css({
                    top: dy
                });

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
                    var dy = event.pageY - self._y * 10;

                    self._scroller.scrollTop((dy / self._scroller.height()) * self._content.height());
                    self._y = event.pageY;
                }
            });
        }

        this.calc = function () {
            this._height = (this._scroller.height() / this._content.height()) * this._scroller.height();
            this._width = this._scroller.width() - this._content.width();
            this._scroller.width(this._scroller.offsetWidth + this._width);
            this._scrollbar.height(this._height - 20);
        };

        this.getLayout = function () {
            return $(this._container);
        };

        _init.call(this, options);
        _initEvents.call(this, options);
        this.calc();

    };

}());