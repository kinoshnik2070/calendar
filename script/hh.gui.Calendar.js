hh.gui.Calendar = hh.klass(hh.Observer, {

	className: "Calendar",
	
	_construct: function () {

		this._today = new Date;

		this._current = new Date;

		this._local = "ru";

		this._key = "data-date";

		this._currentElement = null;

		this._selectClass = "b-calendar__day--select";

		this._todayClass = "b-calendar__day--today";

		this._template = {
			calendarDay: document.getElementById("calendar-day-template").innerHTML,
			calendarTitle: document.getElementById("calendar-title-tempalte").innerHTML
		};

		this._element = {
			container: document.querySelector(".b-calendar__container_day"),
			previousMonth: document.querySelector(".b-calendar__button_previous_month"),
			nextMonth: document.querySelector(".b-calendar__button_next_month"),
			today: document.querySelector(".b-calendar__button_today"),
			title: document.querySelector(".b-calendar__title")
		};

		this._initEvents();
	},

	_initEvents: function () {
		var self = this;
		hh.util.addEvent(this._element.container, "click", function (event) {
			var element = event.target;
			while (element.tagName !== "TD") {
				element = element.parentNode;
				if (typeof element.tagName === "undefined") {
					return;
				}
			}
		
			if (self._currentElement === element) {
				self.deselect();
				return;
			}

			hh.util.addClass(element, self._selectClass);
			hh.util.removeClass(self._currentElement, self._selectClass);
			self._currentElement = element;
			self.fire("select", {
				target: self._currentElement,
				date: new Date(element.getAttribute(self._key))
			});
		});

		hh.util.addEvent(this._element.previousMonth, "click", function () {
			self.go(-1);
		});

		hh.util.addEvent(this._element.nextMonth, "click", function () {
			self.go(1);
		});

		hh.util.addEvent(this._element.today, "click", function () {
			self._current = new Date;
			self.render();
		});
	},

	render: function () {
		this._element.container.innerHTML = "";
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
				str += hh.pattern(this._template.calendarDay, {
					dayOfWeek: hh.LOCAL[this._local].dayOfWeek[j],
					day: tempDate.getDate(), dateString: tempDate.toDateString()
				});
			}
			date = new Date(date.getTime() + 24 * 60 * 60 * 1000 * 7);
			if (date.getMonth() === this._current.getMonth()) {
				weeks++;
			}
			str += "</tr>";
		}
		this._element.container.innerHTML = str;
		hh.util.addClass(document.querySelector("td[" + this._key + "='" + this._today.toDateString() + "']"), this._todayClass);
		this._element.title.innerHTML = hh.pattern(this._template.calendarTitle, { 
			month: hh.LOCAL[this._local].month[this._current.getMonth()],
			year: this._current.getFullYear()
		});
	},

	go: function (index) {
		var month = this._current.getMonth() + index;
		this._current.setMonth(0);
		this._current.setMonth(month);
		this.render();
	},

	deselect: function () {
		hh.util.removeClass(this._currentElement, this._selectClass);
		this._currentElement = null;
	}

});