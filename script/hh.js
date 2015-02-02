(function () {

    "use strict";

    window.hh = {};

    hh.gui = {};
    hh.model = {};
    hh.store = {};
    hh.util = {};
    hh.page = {};

    hh.TEXT = {
        ru: {
            dayOfWeek: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
            month: ["Январь", "Ферваль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]
        }
    };

    hh.LOCAL = {
        ru: {
            month: {
                nom: "января",
                gen: "января",
                plu: "января"
            }
        }
    };

    hh.util.units = function (num, cases) {
        num = Math.abs(num);

        var word = '';

        if (num.toString().indexOf('.') > -1) {
            word = cases.gen;
        } else {
            word = (
                num % 10 === 1 && num % 100 !== 11 ? cases.nom : num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? cases.gen : cases.plu
            );
        }

        return word;
    };



}());