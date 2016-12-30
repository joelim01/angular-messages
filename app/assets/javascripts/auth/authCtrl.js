var AuthCtrl = function($scope, $state, Auth, Flash) {
  var vm = this;

    vm.login = function() {
        Auth.login(vm.user)
          .then(function(){
            $state.go('messages.compose')})
          .catch(function(data) {
            Flash.create('alert', data.data.error);
          });
    };

    vm.register = function() {
        Auth.register(vm.user)
          .then(function(){
            $state.go('messages.compose')})
          .catch(function(data) {
            Flash.create('alert', data.data.error);
          });
    };

}

AuthCtrl.$inject = ['$scope', '$state', 'Auth', 'Flash'];

angular.module('myApp')
    .controller('AuthCtrl', AuthCtrl);
