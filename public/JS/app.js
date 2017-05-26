angular.module('vimeoApp', ["ui.router"])
    .config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'mainCtrl'
            })
            .state('userVideos', {
                url: '/userVideos',
                templateUrl: 'views/userVideos.html',
                controller: 'userVideosCtrl'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'views/search.html',
                controller: 'searchCtrl'
            })
            .state('settings', {
                url: '/settings',
                templateUrl: '../views/settings.html',
                controller: 'settingsCtrl'
            });
        

          });