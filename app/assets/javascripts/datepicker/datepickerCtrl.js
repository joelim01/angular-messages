var DatepickerCtrl = function($scope, Auth, DatepickerService) {

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  var dt2min = tomorrow;

  $scope.today = function() {
      $scope.dates = DatepickerService.dates;
  };

  $scope.today();

  $scope.clear = function() {
    $scope.dates = DatepickerService.resetDates();
  };

  $scope.dateOptions1 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: tomorrow,
    startingDay: 1
  };

  $scope.dateOptions2 = {
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: dt2min,
    startingDay: 1
  };

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.open2 = function() {
    $scope.popup2.opened = true;
    $scope.dates.dt2 = $scope.dates.dt
    $scope.dateOptions2.minDate = $scope.dt
  };

    $scope.popup1 = {
    opened: false
  };

  $scope.popup2 = {
    opened: false
  };
}

DatepickerCtrl.$inject = ['$scope', 'Auth', 'DatepickerService'];

angular.module('myApp')
    .controller('DatepickerCtrl', DatepickerCtrl)
