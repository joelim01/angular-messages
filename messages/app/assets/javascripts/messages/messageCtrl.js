var MessageCtrl = function($rootScope, state, MessageService, $log, datepickerService, $http, Flash, $filter) {
  var MC = this;

  MessageService.getMessages();
  MC.message = angular.copy(MessageService.newMessage);
  MC.getUsers = MessageService.getUsers;
  MC.submitMessage = submitMessage;
  MC.messages = MessageService.messages;
  MC.sentMsg = "Message sent!";

  function submitMessage(form) {
    addDateToMessage();
    if (validateDates()) {
      var data = {message: MC.message}
      MessageService.submit(data, $rootScope.currentUser).then(function() {
        Flash.create('success', ("The message will be sent between " + $filter('date')(data.message.dt, "dd/MM/yyyy") + " and " + $filter('date')(data.message.dt2, "dd/MM/yyyy")+"."));
        resetForm();
      }).catch(function() {
        Flash.create('error', "There has been an error.");
      })
    }
  };

  function addDateToMessage() {
    Object.assign(MC.message, datepickerService.getDates())
  }

  function validateDates() {
    if (MC.message.dt > MC.message.dt2) {
      form.$error.dateError = true;
      return false;
    }
    return true;
  }

  function resetForm() {
    form.$setUntouched();
    form.$setPristine();
    Flash.create('success', MC.sentMsg);
    MC.message = angular.copy(MessageService.newMessage);
  }
  
};


MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'datepickerService', '$http', 'Flash', '$filter'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
