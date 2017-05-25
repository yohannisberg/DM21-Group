'use strict';

angular.module('vimeoApp', ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: '../views/home.html',
        controller: 'mainCtrl'
    }).state('edit', {
        url: '/edit',
        templateUrl: '../views/editvideo.html',
        controller: 'editCtrl'
    });
}]);
'use strict';

angular.module('vimeoApp').controller('accountCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').controller('mainCtrl', ["$scope", "mainService", function ($scope, mainService) {

    $scope.login = function () {
        mainService.login().then(function (res) {
            console.log(res);
        });
    };
}]);
'use strict';

angular.module('vimeoApp').directive('footerDir', function () {

    return {
        restrict: "AE",
        templateUrl: "./views/footerDir.html"
    };
});
'use strict';

angular.module('vimeoApp').directive('navBar', function () {

  return {
    restrict: 'E',
    templateUrl: './views/navBar.html',
    link: function link(scope) {}
  };
});
'use strict';

angular.module('vimeoApp').service('mainService', ["$http", function ($http) {
    var serverUrl = 'http://localhost:3001';
    this.searchVideos = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/'
        });
    };

    this.getVideoById = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + id
        });
    };
    this.getComments = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + id + '/comments'
        });
    };
    this.postComment = function (id) {
        return $http({
            method: 'POST',
            data: '',
            url: serverUrl + '/api/comments/' + id
        });
    };

    this.login = function () {
        return $http({
            method: 'POST',
            url: serverUrl + '/api/login'
        });
    };
}]);
//# sourceMappingURL=bundle.js.map
