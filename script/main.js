var calendar = new hh.gui.Calendar();
var addEventPopup = new hh.gui.Popup({
	template: document.getElementById("popup-add-template").innerHTML,
	position: "left",
	margin: {
		top: -10,
		left: 145
	}
});
var faseEventPopup = new hh.gui.Popup({
	template: document.getElementById("popup-fast-add-template").innerHTML,
	position: "bottom",
	margin: {
		top: 35,
		left: 0
	}
});
var resultSearchList = new hh.gui.DropList({
	tmplItem: "<li class=\"b-list__event_item\"> {title}  </li>"
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
};

hh.util.addEvent(document.querySelector(".b-button"), "click", function(event) {
	faseEventPopup.setAnchor(event.target);
	faseEventPopup.show();
});

hh.util.addEvent(document.getElementById("abc"), "click", function(event) {
	var data = [{
		title: "abasddddddddddddddddddddddddddddddddddddddddddc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}, {
		title: "abc"
	}];
	resultSearchList.setAnchor(event.target);
	resultSearchList.renderByData(data);
});