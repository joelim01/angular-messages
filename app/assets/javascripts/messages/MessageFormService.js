function MessageFormService() {
  var MFS = this;

  MFS.validateDates = function(form, message) {
    var valid = true;
    if (message.dt > message.dt2) {
      form.$error.datePeriodError = true;
      valid = false;
    }
    if (message.dt < new Date()) {
      form.$error.dateStartError = true;
      valid = false;
    }
    return valid;
  }

  MFS.resetForm = function(form) {
    debugger
    form.$setUntouched();
    form.$setPristine();
  }

}

angular.module('myApp')
    .service('MessageFormService', MessageFormService);
