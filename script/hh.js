(function () {
    
    "use strict";

    window.hh = {};

    hh.gui = {};
    hh.model = {};
    hh.store = {};
    hh.util = {};
    hh.page = {};

    hh.LOCAL = {
        ru: {
            dayOfWeek: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            month: ["Январь", "Ферваль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
        }
    };

    hh.extend = function (destination, source) {
        var k;
        for (k in source) {
            if (source.hasOwnProperty(k)) {
                destination[k] = source[k];
            }
        }
        return destination;
    };

}());