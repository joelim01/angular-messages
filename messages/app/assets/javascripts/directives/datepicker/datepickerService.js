var datepickerService = function() {

  this.dates = {
    dt:"",
    dt2:""
  }

  this.getDates = function () {
        return this.dates;
    }

  this.setDate = function(newDate) {
        Object.assign(this.dates, newDate)
        return this.dates;
    }

  this.setDates = function(newDates) {
      newDates.forEach(function(element) {
        this.setDate(element);
      })
      return this.dates;
    }
}

angular
  .module('myApp')
  .service('datepickerService', datepickerService)
