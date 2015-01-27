(function () {
    var MainPage = function () {

        "use strict";

        this._eventStore = new EventStore();

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
            closed: true
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

            this._calendar.on("select", function (event, params) {
                var model = self._eventStore.getByDate(params.date);
                if(!model) {
                    var model = (new Event()).set("date", params.date);
                }
                self._addEventPopup.render(model);
                self._addEventPopup.setAnchor(params.target);
                self._addEventPopup.show();
            });


            window.onresize = function () {
                self._addEventPopup.adjust();
                self._fasteEventPopup.adjust();
                self._resultSearchList.adjust();
            };

            $("#bc").on("click", function (event) {
                self._fasteEventPopup.setAnchor(event.target);
                self._fasteEventPopup.show();
            });

            $("#abc").on("click", function (event) {
                self._resultSearchList.setAnchor(event.target);
                self._resultSearchList.renderByData(self._eventStore.getData());
            });

            self._addEventPopup.getLayout().on("click", ".j-add-event", function () {
                
                var object = $(".b-form__add_event").serializeObject(),
                    event = new Event(object);
                self._eventStore.add(event);
                self._calendar.render();
                self._eventStore.save();
                self._addEventPopup.hide();
                self._calendar.render();
            });

        };

        this._render();
        this._initEvents();
    };

    var page = new MainPage();
    hh.Page = {};
    hh.Page.MainPage = page;
})();