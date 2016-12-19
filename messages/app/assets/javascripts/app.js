angular.module('myApp', ['ui.router', 'templates', 'Devise', 'ngAnimate', 'ui.bootstrap', 'ngTagsInput'])
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
                .state('messages', {
                    url: '/messages',
                    templateUrl: 'messages/_messageNav.html',
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
                })
                .state('messages.compose', {
                    url: '/compose',
                    templateUrl: 'messages/_compose.html',
                })
                .state('messages.outbox', {
                    url: '/outbox',
                    templateUrl: 'messages/_outbox.html',
                })
                .state('messages.sent', {
                    url: '/sent',
                    templateUrl: 'messages/_sent.html',
                })
                .state('login', {
                    url: '/login',
                    templateUrl: 'auth/_login.html',
                    controller: 'AuthCtrl as vm',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('messages');
                        })
                    }]
                })
                .state('register', {
                    url: '/register',
                    templateUrl: 'auth/_register.html',
                    controller: 'AuthCtrl as vm',
                    onEnter: ['$state', 'Auth', function($state, Auth) {
                        Auth.currentUser().then(function (){
                            $state.go('messages');
                        })
                    }]
                });

            $urlRouterProvider.otherwise('home');
        }])
