angular.module('myApp', ['ui.router'])
    .config([
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {

            $stateProvider
                .state('home', {
                    url: '/home',
                    templateUrl: '/home.html',
                    controller: 'MainCtrl'
                })
                .state('user', {
                url: '/user',
                templateUrl: '/posts.html',
                controller: 'PostsCtrl'
            });

            $urlRouterProvider.otherwise('home');
        }])