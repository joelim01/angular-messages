var MessageCtrl = function($rootScope, $state, MessageService, $log, datepickerService, $http, Flash, $filter) {
  var MC = this;

  MessageService.getMessages();
  MC.message = angular.copy(MessageService.newMessage);
  MC.getUsers = MessageService.getUsers;
  MC.submitMessage = submitMessage;
  MC.messages = MessageService.messages;
  MC.read = MessageService.read;
  MC.deleteFromInbox = deleteInboxMessage;
  MC.unread = unread;
  MC.filterUnread = false;


  function unread() {
    return function(message) {
      if (MC.filterUnread == true) {
        return message.message_recipients[0].read == false
      } else {
        return true
      }
    }
  }

  function deleteInboxMessage(message) {
    MessageService.destroy(message, $rootScope.currentUser, "inbox").then(function () {
      mArray = [message]
      MC.messages = $(MC.messages).not(mArray).get();
    })
  }

  function deleteOutboxMessage(message) {
    MessageService.destroy(message, $rootScope.currentUser, "outbox").then(function () {
      mArray = [message]
      MC.messages = $(MC.messages).not(mArray).get();
    })
  }

  function submitMessage(form) {
    addDateToMessage();
    if (validateDates(form)) {
      (function (form) { MessageService.create(MC.message, $rootScope.currentUser).then(function(data) {
          debugger
          Flash.create('success', ("The message will be sent between " + $filter('date')(MC.message.dt, "dd/MM/yyyy") + " and " + $filter('date')(MC.message.dt2, "dd/MM/yyyy")+"."));
          resetForm(form);
        }).catch(function(response) {
          Flash.create('error', "There has been an error.");
          debugger
        });
      })(form);
    }
  };

  function addDateToMessage() {
    Object.assign(MC.message, datepickerService.getDates())
  }

  function validateDates(form) {
    var valid = true;
    if (MC.message.dt > MC.message.dt2) {
      form.$error.datePeriodError = true;
      valid = false;
    }
    if  (MC.message.dt < new Date()) {
      form.$error.dateStartError = true;
      valid = false;
    }
    return valid;
  }

  function resetForm(form) {
    form.$setUntouched();
    form.$setPristine();
    MC.message = angular.copy(MessageService.newMessage);
  }

};


MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'datepickerService', '$http', 'Flash', '$filter'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
