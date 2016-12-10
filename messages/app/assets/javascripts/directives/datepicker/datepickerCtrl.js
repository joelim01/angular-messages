var DatepickerCtrl = function($rootScope, $scope, Auth, datepickerService) {

  $scope.today = function() {
      $scope.dt = new Date();
      $scope.dt2 = new Date();
    };

    $scope.today();

    $scope.clear = function() {
      $scope.dt = null;
      $scope.dt2 = null;
    };

    $scope.$watch('dt', function() {
      var newDate = {dt: $scope.dt}
      datepickerService.setDate(newDate)
    })

    $scope.$watch('dt2', function() {
      var newDate = {dt2: $scope.dt2}
      datepickerService.setDate(newDate)
    })

    $scope.inlineOptions = {
      customClass: getDayClass,
      minDate: new Date(),
      showWeeks: true
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(),
      startingDay: 1
    };

    $scope.toggleMin = function() {
      $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
      $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
    };

    $scope.toggleMin();

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
      $scope.dt2 = new Date(year, month, day);
    };

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 1);
    $scope.events = [
      {
        date: tomorrow,
        status: 'full'
      },
      {
        date: afterTomorrow,
        status: 'partially'
      }
    ];

    function getDayClass(data) {
      var date = data.date,
        mode = data.mode;
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }
    }
}

DatepickerCtrl.$inject = ['$rootScope', '$scope', 'Auth', 'datepickerService'];

angular.module('myApp')
    .controller('DatepickerCtrl', DatepickerCtrl)
