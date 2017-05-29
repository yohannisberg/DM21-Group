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
    }).state('edit', {
        url: '/edit',
        templateUrl: '../views/editvideo.html',
        controller: 'editCtrl'
    }).state('playvideo', {
        url: '/playvideo',
        templateUrl: 'views/playVid.html',
        controller: 'playVideo'
    });
}]);
'use strict';

angular.module('vimeoApp').controller('editCtrl', ["$scope", function ($scope) {}]);
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

angular.module('vimeoApp').controller('navBarCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

  $scope.searchQuery = function (query) {
    mainService.searchVideos(query).then(function (response) {
      mainService.searchedVideo(response.data.data);
      $state.go('search');
      $scope.query = '';
    });
  };
}]);
'use strict';

angular.module('vimeoApp').controller('playVideoCtrl', ["$scope", "mainService", function ($scope, mainService) {
  $scope.video = mainService.video;

  // $scope.testVid=response.data.data[1].embed.html;
  // console.log("hi", typeof $scope.testVid)
  //
  document.querySelector(".videoHolder").innerHTML = $scope.video;
}]);
'use strict';

angular.module('vimeoApp').controller('searchCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

  function test2() {
    $scope.videos = mainService.videoData;
  }

  test2();

  // function test(){
  //   mainService.searchVideos().then(function(response){
  //     $scope.videos=response.data.data;
  // })
  // }
  // test()

  $scope.playVideo = function (videoLink) {
    console.log(videoLink);
    mainService.clickedVideo(videoLink);
    $state.go('playVideo');
  };
}]);
'use strict';

angular.module('vimeoApp').controller('userVideosCtrl', ["$scope", function ($scope) {}]);
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
    link: function link(scope) {},
    controller: 'navBarCtrl'
  };
});
'use strict';

angular.module('vimeoApp').service('mainService', ["$http", function ($http) {
    var serverUrl = 'http://localhost:3001';

    this.videoData = '';

    this.searchedVideo = function (data) {
        this.videoData = data;
    };

    this.video = '';

    this.clickedVideo = function (videoLink) {
        this.video = videoLink;
    };

    this.searchVideos = function (query) {
        console.log(query);
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
//# sourceMappingURL=bundle.js.map
