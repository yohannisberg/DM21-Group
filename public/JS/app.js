angular.module('vimeoApp', ["ui.router"])   
    .config(function($stateProvider, $urlRouterProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: '../views/home.html',
                controller: 'mainCtrl'
            })

            .state('edit' ,{
                url: '/edit',
                templateUrl: '../views/editvideo.html',
                controller: 'editCtrl'
            });



























    });