function MessageFormService() {
  var MFS = this;

  MFS.validateForm = function(form, message) {
    var valid = true;
    if (message.dt > message.dt2) {
      form.$error.datePeriodError = true;
      valid = false;
    }
    if (message.dt < new Date()) {
      form.$error.dateStartError = true;
      valid = false;
    }
    if (message.content == '') {
      form.$error.contentError = true;
      valid = false;
    }
    return valid;
  }

}

angular.module('myApp')
    .service('MessageFormService', MessageFormService);
