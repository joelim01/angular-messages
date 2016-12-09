angular.module('myApp', ['ui.router', 'templates', 'Devise'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: 'home/_home.html',
                    controller: 'MainCtrl'
                })
                .state('user', {
                    url: '/user',
                    templateUrl: 'user/_user.html',
                    controller: 'UserCtrl as vm',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function () {
                            $state.go('user')},
                            function (error) {
                              console.log(error)
                              $state.go('home')
                            }
                        )
                    }]
                })
                .state('user.inbox', {
                    url: '/inbox',
                    templateUrl: 'user/_inbox.html',
                    controller: 'UserCtrl as vm'
                })
                .state('user.compose', {
                    url: '/compose',
                    templateUrl: 'user/_compose.html',
                    controller: 'UserCtrl as vm'
                })
                .state('user.outbox', {
                    url: '/outbox',
                    templateUrl: 'user/_outbox.html',
                    controller: 'UserCtrl as vm'
                })
                .state('user.sent', {
                    url: '/sent',
                    templateUrl: 'user/_sent.html',
                    controller: 'UserCtrl as vm'
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl as vm',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl as vm',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('home');
                        })
                    }]
                });

            $urlRouterProvider.otherwise('home');
        }])
