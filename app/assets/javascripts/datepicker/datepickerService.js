function DatepickerService() {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    var DPS = this;

    DPS.dates = {
        dt: tomorrow,
        dt2: tomorrow
    }

    DPS.resetDates = function() {
      DPS.dates.dt = tomorrow;
      DPS.dates.dt2 = tomorrow;
      return DPS.dates
    }

    DPS.getDates = function() {
        return DPS.dates;
    }

    DPS.setDate = function(newDate) {
        Object.assign(DPS.dates, newDate)
        return DPS.dates;
    }

    DPS.setDates = function(newDates) {
        newDates.forEach(function(element) {
            DPS.setDate(element);
        })
        return DPS.dates;
    }
}

angular
    .module('myApp')
    .service('DatepickerService', DatepickerService)
