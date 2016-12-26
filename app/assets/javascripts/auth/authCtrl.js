var AuthCtrl = function($scope, $state, Auth) {
  var vm = this;

    vm.login = function() {
        Auth.login(vm.user).then(function(){
            $state.go('messages');
        });
    };

    vm.register = function() {
        Auth.register(vm.user).then(function(){
            $state.go('messages');
        });
    };
};

AuthCtrl.$inject = ['$scope', '$state', 'Auth'];

angular.module('myApp')
    .controller('AuthCtrl', AuthCtrl);
