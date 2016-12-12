var MessageCtrl = function($rootScope, state, MessageService, $log, datepickerService, $http) {
  var MC = this;

  MC.message = {
    to: [{text: "tester1"}],
    self: false,
    private: false,
    send_as_group: false,
    subject: "",
    content: ""
                };

  MC.loadUsers = function(query) {
    return $http.get('/api/user?query=' + query)
  }

  MC.submit = function() {
    Object.assign(MC.message, datepickerService.getDates())
    var data = {message: MC.message}
    MessageService.submit(data, $rootScope.currentUser);
  }
}

MessageCtrl.$inject = ['$rootScope', '$state', 'MessageService', '$log', 'datepickerService', '$http'];

angular.module('myApp')
    .controller('MessageCtrl', MessageCtrl);
