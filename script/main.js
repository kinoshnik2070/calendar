"use strict";

var eventStore = new EventStore();
var calendar = new hh.gui.Calendar({
	model: eventStore
});
var addEventPopup = new hh.gui.Popup({
	template: document.getElementById("popup-add-template").innerHTML,
	position: "left",
	margin: {
		top: -10,
		left: 145
	},
	closed: true
});
var faseEventPopup = new hh.gui.Popup({
	template: document.getElementById("popup-fast-add-template").innerHTML,
	position: "bottom",
	margin: {
		top: 35,
		left: 0
	},
	closed: true
});
var resultSearchList = new hh.gui.DropList({
	tmplItem: document.getElementById("result-search-item-template").innerHTML
});

faseEventPopup.render();
addEventPopup.render();
resultSearchList.render();
calendar.render();


addEventPopup.on("hide", function() {
	calendar.deselect();
});

calendar.on("select", function(event, a) {
	addEventPopup.setAnchor(a.target);
	addEventPopup.show();
});


window.onresize = function() {
	addEventPopup.adjust();
	faseEventPopup.adjust();
	resultSearchList.adjust();
};

hh.util.addEvent(document.querySelector(".b-button"), "click", function(event) {
	faseEventPopup.setAnchor(event.target);
	faseEventPopup.show();
});

hh.util.addEvent(document.getElementById("abc"), "click", function(event) {
	var data = [{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	}, {
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	}, {
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	},{
		name: "Митинг на болотной с участием",
		day: 13,
		month: "Февраль"
	}];
	resultSearchList.setAnchor(event.target);
	resultSearchList.renderByData(data);
});

