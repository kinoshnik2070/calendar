(function () {
    "use strict";

    hh.page.MainPage = function () {

        this._eventStore = new hh.store.EventStore();

        this._calendar = new hh.gui.Calendar({
            model: this._eventStore
        });

        this._addEventPopup = new hh.gui.Popup({
            template: $("#popup-add-template").html(),
            position: "left",
            margin: {
                top: -10,
                left: 145
            },
            closed: true
        });

        this._fasteEventPopup = new hh.gui.Popup({
            template: $("#popup-fast-add-template").html(),
            position: "bottom",
            margin: {
                top: 35,
                left: 0
            },
            closed: true,
            anchor: $("#bc")
        });

        this._resultSearchList = new hh.gui.DropList({
            tmplItem: $("#result-search-item-template").html()
        });

        this._render = function () {
            this._fasteEventPopup.render();
            this._addEventPopup.render();
            this._resultSearchList.render();
            this._calendar.render();
        };

        this._initEvents = function () {

            var self = this;

            this._addEventPopup.on("hide", function () {
                self._calendar.deselect();
            });

            this._calendar.on("select", $.proxy(this.selectDay, this));
            this._resultSearchList.on("clickItem", $.proxy(this.selectSearchItem, this));


            $(window).on("resize", $.proxy(this.adjust, this));

            $("#abc").on("click", function (event) {
                self._resultSearchList.setAnchor(event.target);
                self._resultSearchList.renderByData(self._eventStore.getData());
            });

            self._addEventPopup.getLayout().on("click", ".j-add-event", function () {
                var object = $(".b-form__add_event").serializeObject(),
                    event = new hh.model.Event(object);

                if (event.valid()) {
                    self._eventStore.add(event);
                    self._eventStore.save();
                    self._addEventPopup.hide();
                    self._calendar.render();
                }
            });

        };

        this.selectDay = function (params) {
            var model = this._eventStore.getByDate(params.date);
            if (!model) {
                model = (new hh.model.Event()).set("date", params.date);
            }
            this._addEventPopup.render(model);
            this._addEventPopup.setAnchor(params.target);
            this._addEventPopup.show();
        };

        this.selectSearchItem = function (params) {
            var id = params.target.data("event_id"),
                model = this._eventStore.getById(id);
            this._calendar.select(model.get("date"));
        };

        this.adjust = function () {
            this._addEventPopup.adjust();
            this._fasteEventPopup.adjust();
            this._resultSearchList.adjust();
        };

        this._render();
        this._initEvents();
    };

    var page = new hh.page.MainPage();
    window.page = page;

}());