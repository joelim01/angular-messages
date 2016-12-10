var MessageCtrl = function($rootScope, state, MessageService, $log, datepickerService) {
  var MC = this;

  MC.message = {
    self: false,
    private: false,
    send_as_group: false,
    subject: "",
    content: ""
                };

  MC.submit = function() {
    Object.assign(MC.message, datepickerService.getDates())
    var data = {message: MC.message}
    MessageService.submit(data, $rootScope.currentUser);
  }
}

MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'datepickerService'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
