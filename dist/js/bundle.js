'use strict';

angular.module('vimeoApp', ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: '../views/home.html',
        controller: 'mainCtrl'
    }).state('userVideos', {
        url: '/userVideos',
        templateUrl: './views/userVideos.html',
        controller: 'userVideosCtrl'
    }).state('search', {
        url: '/search',
        templateUrl: 'views/search.html',
        controller: 'searchCtrl'
    }).state('edit', {
        url: '/edit',
        templateUrl: '../views/editvideo.html',
        controller: 'editCtrl'
    }).state('playVideo', {
        url: '/playVideo',
        templateUrl: 'views/playVideo.html',
        controller: 'playVideoCtrl'
    }).state('uploadVideo', {
        url: '/uploadVideo',
        templateUrl: 'views/uploadVideo.html',
        controller: 'uploadVideoCtrl'
    }).state('upload', {
        url: '/upload',
        templateUrl: './views/upload.html',
        controller: 'uploadCtrl'
    });
}]);
'use strict';

angular.module('vimeoApp').controller('editCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').controller('mainCtrl', ["$scope", "mainService", function ($scope, mainService) {

    $scope.login = function () {
        mainService.login().then(function (res) {
            $scope.data = res.data;
        });
    };
    $scope.login();
}]);
'use strict';

angular.module('vimeoApp').controller('navBarCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    $scope.searchQuery = function (query) {
        $state.go('home');
        mainService.searchVideos(1, query).then(function (response) {
            mainService.searchedVideo(response.data.data);
            $state.go('search');
            $scope.query = '';
        });
    };
    $scope.getUser = function () {
        mainService.getUser().then(function (res) {
            console.log(res.data); //res.data is the currently logged-in user's info
            $state.go('upload');
        });
    };
}]);
'use strict';

angular.module('vimeoApp').controller('playVideoCtrl', ["$scope", "mainService", function ($scope, mainService) {
    $scope.video = mainService.video;

    var id = mainService.id.replace(/\D/g, '');

    mainService.getComments(id).then(function (res) {
        $scope.comments = res.data.data;
        console.log($scope.comments);
    });
    document.querySelector(".videoHolder").innerHTML = $scope.video;
}]);
'use strict';

angular.module('vimeoApp').controller('searchCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    function test2() {
        $scope.videos = mainService.videoData;
    }
    test2();

    $scope.getVideoID = function (id) {
        mainService.getId(id);
    };

    $scope.playVideo = function (videoLink) {
        mainService.clickedVideo(videoLink);
        $state.go('playVideo');
    };

    $scope.page = function (num) {
        mainService.searchVideos(num, mainService.query).then(function (res) {
            $scope.videos = res.data.data;
        });
    };
}]);
'use strict';

angular.module('vimeoApp').controller('uploadCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {
    $scope.upload = function () {
        mainService.uploadVideo($scope.video).then(function (res) {
            console.log(res.data);
            $state.go('userVideos');
        });
    };
}]);
'use strict';

angular.module('vimeoApp').controller('uploadVideoCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').controller('userVideosCtrl', ["$scope", "mainService", function ($scope, mainService) {
    $scope.userVideos = function () {
        mainService.userVideos().then(function (res) {
            $scope.videos = res.data.data;
            console.log($scope.videos);
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
    link: function link(scope) {},
    controller: 'navBarCtrl'
  };
});
'use strict';

angular.module('vimeoApp').service('mainService', ["$http", function ($http) {
    var _this = this;

    var serverUrl = 'http://localhost:3005';

    this.videoData = '';

    this.searchedVideo = function (data) {
        this.videoData = data;
    };
    this.id = '';

    this.getId = function (id) {
        _this.id = id;
    };

    this.video = '';

    this.clickedVideo = function (videoLink) {
        this.video = videoLink;
    };

    this.searchVideos = function (page, query) {
        _this.query = query;
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + page + '?search=' + query
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
    this.getUser = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/currentuser'
        });
    };
    this.uploadVideo = function (video) {
        console.log(video);
        return $http({
            method: 'POST',
            data: { video: video },
            url: serverUrl + '/api/upload'
        });
    };
    this.userVideos = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        });
    };
}]);
//# sourceMappingURL=bundle.js.map
