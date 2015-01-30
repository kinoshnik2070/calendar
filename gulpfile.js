var gulp = require('gulp'),
    jslint = require("gulp-jslint");


gulp.task("js", function () {
    gulp.src(["./script/hh.js",
        "./script/hh.Observer.js",
        "./script/hh.Model.js",
        "./script/model/hh.model.Event.js",
        "./script/model/hh.model.Person.js",
        "./script/hh.Store.js",
        "./script/store/hh.store.EventStore.js",
        "./script/gui/hh.gui.Calendar.js",
        "./script/gui/hh.gui.Popup.js",
        "./script/gui/hh.gui.DropList.js",
        "./script/gui/hh.gui.Scrollbar.js",
        "./script/gui/hh.model.event.js",
        "./script/page/hh.page.Main.js"
    ]).pipe(jslint({
        global: ["hh", "$", "doT", "document", "window"],
        nomen: true,
        plusplus: true
    }));
    /* .pipe(concat('index.js'))
     .pipe(uglify())
     .pipe(gulp.dest('./build/js'));*/
});