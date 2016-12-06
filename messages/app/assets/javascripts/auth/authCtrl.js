var AuthCtrl = function($scope, $state, Auth) {
    $scope.login = function() {
        Auth.login($scope.user).then(function(){
            $state.go('home');
        });
    };

    $scope.register = function() {
        Auth.register($scope.user).then(function(){
            $state.go('home');
        });
    };


};

AuthCtrl.$inject = ['$scope', '$state', 'Auth'];

angular.module('myApp')
    .controller('AuthCtrl', AuthCtrl);