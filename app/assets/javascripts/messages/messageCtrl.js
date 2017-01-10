var MessageCtrl = function($rootScope, $state, MessageService, $log, DatepickerService, $http, Flash, $filter, MessageFormService, PaginationService) {
  var MC = this;
  var PS = PaginationService;
  var MS = MessageService;

  MC.filterUnread = false;
  MC.message = angular.copy(MessageService.newMessage);
  MC.mergeDates = mergeDates;
  MC.messages = {};

  MC.createMessage = createMessage;
  MC.deleteFromInbox = deleteInboxMessage;
  MC.deleteFromOutbox = deleteOutboxMessage;
  MC.getUsers = MessageService.getUsers;
  MC.read = MessageService.read;
  MC.unread = unread;
  MC.validateForm = MessageFormService.validateForm

  activate();

  function activate() {
    MessageService.getMessages(PS.pages.inboxPage, "inbox").then(function(response) {
      MessageService.getMessages(PS.pages.outboxPage, "outbox").then(function(response) {
        MessageService.getMessages(PS.pages.sentPage, "sent").then(function(response) {
          MC.messages = { data: MS.messages }
        })
      })
    })
  }

  function unread(message) {
    return function(message) {
      if (MC.filterUnread == true) {
        return message.message_recipients[0].read == false
      } else {
        return true
      }
    }
  }

  function deleteInboxMessage(message) {
    MessageService.destroyMessage(message, "inbox").then(function () {
      mArray = [message]
      MC.messages.inboxMessages = $(MC.messages.inboxMessages).not(mArray).get();
    })
  }

  function deleteOutboxMessage(message) {
    MessageService.destroyMessage(message, "outbox").then(function () {
      mArray = [message]
      MC.messages.outboxMessages = $(MC.messages.outboxMessages).not(mArray).get();
    })
  }

  function resetForm(form) {
    form.$setPristine()
    form.$setUntouched()
    MC.message = angular.copy(MessageService.newMessage);
    DatepickerService.resetDates();
    console.log(DatepickerService)
  }

  function createMessage(form) {
    mergeDates(MC.message)
    if (MC.validateForm(form, MC.message)) {
      (function (form) { MessageService.createMessage(MC.message).then(function(data) {
        debugger
          Flash.create('success', ("The message will be sent between " + $filter('date')(MC.message.dt, "MM/dd/yyyy") + " and " + $filter('date')(MC.message.dt2, "MM/dd/yyyy")+"."));
          resetForm(form)
        }).catch(function(response) {
          Flash.create('error', "There has been an error.");
        });
      })(form);
    }
  };

  function mergeDates(message) {
    MC.message.dt = DatepickerService.dates.dt
    MC.message.dt2 = DatepickerService.dates.dt2
  }

};

MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'DatepickerService', '$http', 'Flash', '$filter', 'MessageFormService', 'PaginationService'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
