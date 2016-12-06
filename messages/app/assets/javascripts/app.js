angular.module('myApp', ['ui.router', 'templates'])
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
                controller: 'MainCtrl'
            });

            $urlRouterProvider.otherwise('home');
        }])