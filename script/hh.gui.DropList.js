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

        hh.gui.Popup.call(this, options);

        this._data = [];

        this._tmplItem = doT.template(options.tmplItem);

        this.renderByData = function (data) {

            this.getLayout().find(".b-list__event").html(this._tmplItem(data));
            this.show();

            var b = {
                scroller: this.getLayout().find(".b-list__scroll"),
                content: this.getLayout().find(".b-list__event"),
                wrapper: this.getLayout().find(".b-list__scroll_container")
            };
            if (!this.scrollbar) {
                this.scrollbar = new hh.gui.Scrollbar(b);
            }
            this.scrollbar.calc();
            if (b.content.height() < b.scroller.height()) {
                this.getLayout().addClass("b-popup-none-scoller");
            }
        };

        this.initEvents = function() {
            var self = this;
            this.getLayout().on("click", "li", function(event) {
                self.fire("clickItem", {
                    target: $(this)
                });
                self.hide();
            });
        };

        this.initEvents();

    };
})();