(function () {

    "use strict";

    hh.gui.Calendar = function (options) {

        hh.Observer.call(this, arguments);

        this._today = new Date;

        this._current = new Date;

        this._local = "ru";

        this._key = "date";

        this._currentElement = null;

        this._selectClass = "b-calendar__day--select";

        this._todayClass = "b-calendar__day--today";

        this._template = {
            calendarDay: doT.template($("#calendar-day-template").html()),
            calendarTitle: doT.template($("#calendar-title-tempalte").html())
        };

        this._element = {
            container: $(".b-calendar__container_day"),
            previousMonth: $(".j-calendar_previous_month"),
            nextMonth: $(".j-calendar_next_month"),
            today: $(".j-calendar_go_today"),
            title: $(".j-calendar-title")
        };

        this._model = options.model;

        this._initEvents = function () {
            var self = this;

            this.getLayout().on("click", "td", function (event) {
                $(self._currentElement).removeClass(self._selectClass);
                $(this).addClass(self._selectClass);
                self._currentElement = $(this);
                self.fire("select", {
                    target: self._currentElement,
                    date: new Date($(this).data(self._key))
                });

            });

            this._element.previousMonth.on("click", function () {
                self.go(-1);
            });

            this._element.nextMonth.on("click", function () {
                self.go(1);
            });

            this._element.today.on("click", function () {
                self._current = new Date;
                self.render();
            });
        };

        this.render = function () {
            this.getLayout().html("");
            var date = new Date(this._current.getFullYear(), this._current.getMonth()),
                k = 1;

            date.setDate(k)
            while (date.getDay() !== 1) {
                k--;
                date = new Date(this._current.getFullYear(), this._current.getMonth());
                date.setDate(k);
            }

            var weeks = 1,
                days = 7,
                tempDate,
                str = "";
            for (var i = 0; i < weeks; i++) {
                str += "<tr>";
                for (var j = 0; j < days; j++) {
                    tempDate = new Date(date.getTime() + 24 * 60 * 60 * 1000 * j);
                    var params = {
                        dayOfWeek: hh.LOCAL[this._local].dayOfWeek[j],
                        day: tempDate.getDate(),
                        dateString: tempDate.toDateString(),
                        event: this._model.getByDate(tempDate),
                        row: i
                    };
                    str += this._template.calendarDay(params);
                }
                date = new Date(date.getTime() + 24 * 60 * 60 * 1000 * 7);
                if (date.getMonth() === this._current.getMonth()) {
                    weeks++;
                }
                str += "</tr>";
            }
            this.getLayout().html(str);
            $("td[" + this._key + "='" + this._today.toDateString() + "']").addClass(this._todayClass);
            this._element.title.html(this._template.calendarTitle({
                month: hh.LOCAL[this._local].month[this._current.getMonth()],
                year: this._current.getFullYear()
            }));
        };

        this.go = function (index) {
            var month = this._current.getMonth() + index;
            this._current.setMonth(0);
            this._current.setMonth(month);
            this.render();
        };

        this.deselect = function () {
            $(this._currentElement).removeClass(this._selectClass);
            this._currentElement = null;
        };

        this.getLayout = function () {
            return this._element.container;
        };

        this.getActiveDate = function() {
            return new Date(this._currentElement.data(this._key));
        };

        this._initEvents();

    };
})();