var MessageCtrl = function($rootScope, state, MessageService, $log, datepickerService, $http) {
  var MC = this;

  MessageService.getMessages();
  MC.message = MessageService.newMessage;
  MC.getUsers = MessageService.getUsers;
  MC.submitMessage = submitMessage;
  MC.inboxMessages = MessageService.inboxMessages;

  function submitMessage() {
    Object.assign(MC.message, datepickerService.getDates())
    var data = {message: MC.message}
    MessageService.submit(data, $rootScope.currentUser);
  };

}

MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'datepickerService', '$http'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
