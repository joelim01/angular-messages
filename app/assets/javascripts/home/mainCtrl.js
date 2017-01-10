var MainCtrl = function($rootScope, $state, Auth) {
  $rootScope.signedIn = Auth.isAuthenticated;
  $rootScope.logout = Auth.logout;

  Auth.currentUser().then(function (user){
      $rootScope.currentUser = user;
  });

  $rootScope.$on('devise:new-registration', function (e, user){
      $rootScope.currentUser = user;
  });

  $rootScope.$on('devise:login', function (e, user){
      $rootScope.currentUser = user;
  });

  $rootScope.$on('devise:logout', function (e, user){
      $rootScope.currentUser = null;
        $state.go('home');
  });

}

MainCtrl.$inject = ['$rootScope', '$state', 'Auth'];

angular
    .module('myApp')
    .controller('MainCtrl', MainCtrl);
