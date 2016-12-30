var MessageCtrl = function($rootScope, $state, MessageService, $log, datepickerService, $http, Flash, $filter, MessageFormService) {
  var MC = this;

  MessageService.getMessages();
  MC.deleteFromInbox = deleteInboxMessage;
  MC.deleteFromOutbox = deleteOutboxMessage;
  MC.getUsers = MessageService.getUsers;
  MC.filterUnread = false;
  MC.message = angular.copy(MessageService.newMessage);
  MC.messages = MessageService.messages;
  MC.submitMessage = submitMessage;
  MC.read = MessageService.read;
  MC.unread = unread;
  MC.validateDates = MessageFormService.validateDates

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
    if (MC.validateDates(form, MC.message)) {
      (function (form) { MessageService.create(MC.message, $rootScope.currentUser).then(function(data) {
          Flash.create('success', ("The message will be sent between " + $filter('date')(MC.message.dt, "dd/MM/yyyy") + " and " + $filter('date')(MC.message.dt2, "dd/MM/yyyy")+"."));
          resetForm(form);
        }).catch(function(response) {
          Flash.create('error', "There has been an error.");
        });
      })(form);
    }
  };

  function addDateToMessage() {
    Object.assign(MC.message, datepickerService.getDates())
  }

  function resetForm(form) {
    MessageFormService.resetForm(form);
    MC.message = angular.copy(MessageService.newMessage);
  }

  function resetMessage() {
    MC.message = angular.copy(MessageService.newMessage);
  }

};


MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'datepickerService', '$http', 'Flash', '$filter', 'MessageFormService'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
