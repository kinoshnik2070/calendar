(function () {

    "use strict";

    hh.gui.DropList = function (options) {

        $.extend(options, {
            template: $("#scroll-list-template").html(),
            position: "bottom",
            margin: {
                top: 35,
                left: 0
            }
        });

        hh.gui.Popup.apply(this, arguments);

        this._data = [];

        this._tmplItem = doT.template(options.tmplItem);

        function _initEvents() {
            var self = this;
            this.getLayout().on("click", "li", function () {
                self.fire("clickItem", {
                    target: $(this)
                });
                self.hide();
            });
        }

        this.renderByData = function (data) {
            this.getLayout().find(".b-list__event").html(this._tmplItem(data));
            this.show();

            var element = {
                scroller: this.getLayout().find(".b-list__scroll"),
                content: this.getLayout().find(".b-list__event")
            };

            this.getLayout().removeClass("b-popup-none-scoller");
            if (element.content.height() < element.scroller.height()) {
                this.getLayout().addClass("b-popup-none-scoller");
            }
        };

        _initEvents.call(this);
    };
}());