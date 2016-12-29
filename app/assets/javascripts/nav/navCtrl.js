var NavCtrl = function($rootScope, Auth, UserService) {
  var vm = this;
  this.noUser = UserService.noUser
}

NavCtrl.$inject = ['$rootScope', 'Auth', 'UserService'];

angular.module('myApp')
    .controller('NavCtrl', NavCtrl)
