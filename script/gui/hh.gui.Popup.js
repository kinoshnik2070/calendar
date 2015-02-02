(function () {

    "use strict";

    hh.gui.Popup = function (options) {

        hh.Observer.call(this, arguments);

        if (options === undefined) {
            options = {};
        }

        this.margin = options.margin;

        this._template = {
            popup: doT.template($("#popup-template").html()),
            content: doT.template(options.template)
        };

        this._popup = $(this._template.popup(options));

        this._container = this._popup.find(".j-popup-content");

        this._anchor = options.anchor || null;


        function _initEvents() {

            var self = this;

            this.getPopup().find(".j-close-popup").on("click", function () {
                self.hide();
            });

            if (this._anchor) {
                this._anchor.on("click", function () {
                    self._calckPosition();
                    self.show();
                });
            }
        };

        this.render = function (model) {
            if (model) {
                this.getLayout().html(this._template.content(model));
            } else {
                $(document.body).append(this._popup);
                this.getLayout().html(this._template.content(new hh.model.Event()));
            }
        };

        this.show = function () {
            this.getPopup().removeClass("g-hidden");
        };

        this.hide = function () {
            this.getPopup().addClass("g-hidden");
            this.fire("hide");
        };

        this.setAnchor = function (anchor) {
            this._anchor = $(anchor);
            this._calckPosition();
        };

        this._calckPosition = function () {
            if (this._anchor === null) {
                return;
            }
            this.getPopup().css({
                left: (this._anchor.offset().left + this.margin.left) + "px"
            });
            this.getPopup().css({
                top: (this._anchor.offset().top + this.margin.top) + "px"
            });
        };

        this.adjust = function () {
            this._calckPosition();
        };

        this.getLayout = function () {
            return $(this._container);
        };

        this.getPopup = function () {
            return this._popup;
        };

        _initEvents.call(this, options);
        this.hide();

    };

}());