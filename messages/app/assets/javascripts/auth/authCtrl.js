var AuthCtrl = function($scope, $state, Auth) {
  var vm = this;

    vm.login = function() {
      console.log(vm.user)
        Auth.login(vm.user).then(function(){
            $state.go('user');
        });
    };

    vm.register = function() {
        Auth.register(vm.user).then(function(){
            $state.go('user');
        });
    };
};

AuthCtrl.$inject = ['$scope', '$state', 'Auth'];

angular.module('myApp')
    .controller('AuthCtrl', AuthCtrl);
