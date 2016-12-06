.controller('MainCtrl', [
    '$scope',
    function($scope){
        $scope.thing = 'Hello world!';
    }]);

angular
    .module('myApp')
    .controller('MainCtrl', MainCtrl)
