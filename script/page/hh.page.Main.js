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
            anchor: $(".j-fast_add_event_show")
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
            this._eventStore.on("validError", function () {
                window.alert("Не удалось добавить событие");
            });


            $(window).on("resize", $.proxy(this.adjust, this));

            $(".j-input_search").on("input", $.proxy(this.searchQuery, this));
            $(".j-input_search").on("focus", $.proxy(this.searchQuery, this));

            self._fasteEventPopup.getLayout().on("click", ".j-fast_add_event", function () {
                var object = $(".b-form_fast_add_event").serializeObject(),
                    event = self._parseFastEvent(object.event);
                self._eventStore.add(event);
                self._eventStore.save();
                self._fasteEventPopup.hide();
            });

            self._addEventPopup.getLayout().on("click", ".j-add-event", function () {
                var object = $(".b-form__add_event").serializeObject(),
                    event = new hh.model.Event(object);
                self._eventStore.add(event);
                self._eventStore.save();
                self._addEventPopup.hide();
            });

            self._addEventPopup.getLayout().on("click", ".j-delete-event", function () {
                var id = $(this).data("event_id");
                self._eventStore.deleteEvent(id);
                self._eventStore.save();
                self._addEventPopup.hide();
            });

        };

        this.selectDay = function (params) {
            var model = this._eventStore.getByDate(params.date),
                self = this;
            if (!model) {
                model = (new hh.model.Event()).set("date", params.date);
            }
            this._addEventPopup.render(model);
            this._addEventPopup.setAnchor(params.target);
            window.setTimeout(function () {
                self._addEventPopup.show();
            }, 20);
        };

        this.selectSearchItem = function (params) {
            var id = params.target.data("event_id"),
                model = this._eventStore.getById(id);
            this._calendar.select(model.get("date"));
        };

        this.searchQuery = function (event) {
            var element = $(event.target),
                data;
            if (element.val().length > 1) {
                data = this._eventStore.search(element.val());
                this._resultSearchList.setAnchor(element);
                this._resultSearchList.renderByData(data);
            } else {
                this._resultSearchList.hide();
            }
        };

        this._parseFastEvent = function (str) {
            if (str.split(",").length !== 2) {
                return new hh.model.Event();
            }
            var arr = str.split(","),
                date = arr[0].split(" "),
                title = arr[1].trim(),
                day = parseInt(date[0], 10),
                month = date[1].trim(),
                year = this._calendar.getCurrentyDate().getFullYear(),
                i;
            for (i = 0; i < hh.TEXT[hh.getCulture()].monthsGenitive.length; i++) {
                if (month.toLowerCase() === hh.TEXT[hh.getCulture()].monthsGenitive[i]) {
                    date = new Date(year, i, day);
                    break;
                }
            }
            return new hh.model.Event({
                title: title,
                date: date
            });
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