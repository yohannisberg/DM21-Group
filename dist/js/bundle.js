'use strict';

angular.module('vimeoApp', ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: '../views/home.html',
        controller: 'mainCtrl'
    }).state('userVideos', {
        url: '/userVideos',
        templateUrl: 'views/userVideos.html',
        controller: 'userVideosCtrl'
    }).state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'searchCtrl'
    }).state('settings', {
        url: '/settings',
        templateUrl: '../views/settings.html',
        controller: 'settingsCtrl'
    }).state('play', {
        url: '/playvideo',
        templateUrl: '../views/playVid.html',
        controller: 'playVidCtrl'
    });
}]);
'use strict';

angular.module('vimeoApp').controller('accountCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').controller('mainCtrl', ["$scope", "mainService", function ($scope, mainService) {

    $scope.login = function () {
        mainService.login().then(function (res) {

            $scope.data = res.data;
            console.log($scope.data);
        });
    };
    $scope.login();
}]);
'use strict';

angular.module('vimeoApp').controller('playVidCtrl', ["$scope", "mainService", function ($scope, mainService) {

  $scope.videos = [1, 2, 3, 4, 5, 6, 7, 8, 9];
}]);
'use strict';

angular.module('vimeoApp').controller('searchCtrl', ["$scope", "mainService", function ($scope, mainService) {

  function test() {
    mainService.searchVideos('cat').then(function (response) {
      console.log(response.data.data);
      $scope.videos = response.data.data;
    });
  }

  test();
}]);
"use strict";
'use strict';

angular.module('vimeoApp').controller('userVideosCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').service('mainService', ["$http", function ($http) {
    var serverUrl = 'http://localhost:3001';
    // this.searchVideos = () => {
    //     return $http({
    //         method: 'GET',
    //         url: serverUrl + '/api/videos/'
    //     })
    // };

    this.searchVideos = function (query) {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos?search=' + query
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

            method: 'GET',
            url: serverUrl + '/api/login'
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
//# sourceMappingURL=bundle.js.map
