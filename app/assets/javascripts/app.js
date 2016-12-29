angular.module('myApp', ['ui.router', 'templates', 'Devise', 'ngAnimate', 'ui.bootstrap', 'ngTagsInput', 'ngMessages', 'ngFlash', 'angularUtils.directives.dirPagination', 'ngAnimate'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        '$locationProvider',
        function($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true);
            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'MainCtrl',
                    data: {
                      bodyClass: 'blue'
                    }
                })
                .state('messages', {
                    url: '/messages',
                    templateUrl: 'messages/_messageNav.html',
                    data: {
                      bodyClass: 'blue'
                    },
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function () {
                            $state.go($state.current.name)},
                            function (error) {
                              console.log(error)
                              $state.go('home')
                            }
                        )
                    }]
                })
                .state('messages.inbox', {
                    url: '/inbox',
                    templateUrl: 'messages/_inbox.html',
                    data: {
                      bodyClass: 'bbg'
                    }
                })
                .state('messages.compose', {
                    url: '/compose',
                    templateUrl: 'messages/_compose.html',
                    data: {
                      bodyClass: 'blue'
                    }
                })
                .state('messages.outbox', {
                    url: '/outbox',
                    templateUrl: 'messages/_outbox.html',
                    data: {
                      bodyClass: 'bg'
                    }
                })
                .state('messages.sent', {
                    url: '/sent',
                    templateUrl: 'messages/_sent.html',
                    data: {
                      bodyClass: 'bgb'
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl as vm',
                    data: {
                      bodyClass: 'blue'
                    },
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('messages.compose');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl as vm',
                    data: {
                      bodyClass: 'blue'
                    },
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('messages.compose');
                        })
                    }]
                });

            $urlRouterProvider.otherwise('home');
        }]).run(['$rootScope', '$state', function($rootScope, $state) {
          $rootScope.$state = $state;
        }])
