angular.module('vimeoApp', ["ui.router"])
    .config(function($stateProvider, $urlRouterProvider){

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
            .state('edit' ,{
                url: '/edit',
                templateUrl: '../views/editvideo.html',
                controller: 'editCtrl'
            });

            .state('edit' ,{
                url: '/edit',
                templateUrl: '../views/editvideo.html',
                controller: 'editCtrl'
            });


          });

























    });
>>>>>>> master
