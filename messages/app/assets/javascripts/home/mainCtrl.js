var MainCtrl = function($scope) {
      $scope.thing = 'Hello world!';
    };

MainCtrl.$inject = ['$scope'];

angular
    .module('myApp')
    .controller('MainCtrl', MainCtrl);
