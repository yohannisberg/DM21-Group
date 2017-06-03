'use strict';

angular.module('vimeoApp', ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: './views/home.html',
        controller: 'mainCtrl'
    }).state('userVideos', {
        url: '/userVideos',
        templateUrl: './views/userVideos.html',
        controller: 'userVideosCtrl'
    }).state('search', {
        url: '/search',
        templateUrl: './views/search.html',
        controller: 'searchCtrl'
    }).state('edit', {
        url: '/edit',
        templateUrl: './views/editvideo.html',
        controller: 'editCtrl'
    }).state('playvideo', {
        url: '/playvideo',
        templateUrl: './views/playVid.html',
        controller: 'playVideo'
    }).state('uploadVideo', {
        url: '/uploadVideo',
        templateUrl: './views/uploadVideo.html',
        controller: 'uploadVideoCtrl'
    }).state('loading', {
        url: '/searching',
        templateUrl: './views/loading.html',
        controller: 'loadingCtrl'
    }).state('watchLater', {
        url: '/watchlater',
        templateUrl: './views/watchLater.html',
        controller: 'userVideos'
    });
}]);
'use strict';

angular.module('vimeoApp').controller('accountCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').controller('loadingCtrl', ["$scope", "$timeout", function ($scope, $timeout) {

    $scope.loadB = true;
    $scope.loadG = false;
    $scope.loadR = false;

    $timeout();

    $timeout(function () {
        $scope.loadG = true;
    }, 500);

    $timeout();

    $timeout(function () {
        $scope.loadR = true;
    }, 1000);

    $timeout();
}]);
'use strict';

angular.module('vimeoApp').controller('mainCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    $scope.login = function () {
        mainService.login().then(function (res) {
            $scope.data = res.data;
        });
    };
    $scope.login();

    $scope.playVideo = function (videoLink, uri) {
        mainService.clickedVideo(videoLink);
        var id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    };

    mainService.getVideosByChannel('staffpicks').then(function (res) {
        $scope.staffpicks = res.data.data;
    });
}]);
'use strict';

angular.module('vimeoApp').controller('navBarCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    $scope.profilePicAndUpload = false;

    $scope.logInNavBar = true;

    $scope.mainDropDown = true;

    $scope.login = function () {
        mainService.login().then(function (res) {
            $scope.data = res.data;
        });
    };
    $scope.login();

    $scope.logout = function () {
        $scope.logInNavBar = false;
        mainService.logout().then(function (res) {
            console.log(res);
        });
    };

    $scope.searchQuery = function (query) {
        $state.go('loading');
        mainService.searchVideos(1, query).then(function (response) {
            mainService.searchedVideo(response.data.data);
            $state.go('search');
            $scope.query = '';
        });
    };
    $scope.getUser = function () {
        $state.go('uploadVideo');
        mainService.getUser().then(function (res) {});
    };

    $scope.checkUser = function () {
        mainService.getUser().then(function (res) {
            if (res.data.name) {
                $scope.logInNavBar = false;
                $scope.profilePicture = res.data.pictures[3].link;
                $scope.userName = res.data.name;
                $scope.profilePicAndUpload = true;
            }
        });
    };

    $scope.checkUser();
}]);
'use strict';

angular.module('vimeoApp').controller('playVideo', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    $scope.video = mainService.video;

    var id = mainService.arr[0];
    $scope.comments = [];

    mainService.getComments(id).then(function (res) {
        $scope.comments = res.data.data;
    });

    $scope.addComment = function () {
        var id = mainService.arr[0];
        // $state.go('loading');
        mainService.postComment(id, $scope.text).then(function (res) {
            mainService.getComments(id).then(function (res) {
                $scope.comments = res.data.data;
                // $state.go('playvideo');
            });
        });
    };
    $scope.playVideo = function (videoLink, uri) {
        $state.go('loading');
        console.log(videoLink, uri);
        mainService.clickedVideo(videoLink);
        var id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    };

    $scope.getVideo = function () {
        var id = mainService.arr[0];
        mainService.getVideoById(id).then(function (res) {
            $scope.media = res.data;
        });
    };
    $scope.getVideo();

    mainService.getVideosByChannel('staffpicks').then(function (res) {
        $scope.staffpicks = res.data.data;
    });

    document.querySelector(".video-window").innerHTML = $scope.video;
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

    $scope.playVideo = function (videoLink, uri) {
        mainService.clickedVideo(videoLink);
        var id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    };

    $scope.page = function (num) {
        mainService.searchVideos(num, mainService.query).then(function (res) {
            $scope.videos = res.data.data;
        });
    };
    $scope.addToWatchLaterList = function () {
        mainService.getVideoById;
        mainService.addToWatchLater(video, id).then(function (res) {
            console.log(res);
        });
    };
}]);
"use strict";
'use strict';

angular.module('vimeoApp').controller('uploadVideoCtrl', ["$scope", "mainService", "$state", "$http", function ($scope, mainService, $state, $http) {

    $scope.getAccessToken = function () {
        mainService.getAccessToken().then(function (resp) {
            $http({
                method: 'POST',
                url: 'https://api.vimeo.com/me/videos',
                headers: { Authorization: 'Bearer ' + resp.data.access_token },
                data: {
                    type: 'POST',
                    redirect_url: 'http://localhost:3012/#!/userVideos'
                }
            }).then(function (res) {
                var link = res.data.upload_link_secure;
                $http({
                    method: 'POST',
                    url: link,
                    data: $scope.video
                }).then(function (res) {
                    console.log(res);
                });
            });
        });
    };
}]);
'use strict';

angular.module('vimeoApp').controller('userVideosCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {
    $scope.userVideos = function () {
        mainService.userVideos().then(function (res) {
            $scope.videos = res.data.data;
            console.log($scope.videos);
        });
    };
    $scope.userVideos();

    $scope.play = function (videoLink, uri) {
        mainService.clickedVideo(videoLink);
        var id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    };
    $scope.displayWatchLaterList = function () {
        var id = mainService.arr[0];
        mainService.getVideoById(id).then(function (res) {
            mainService.getWatchLaterList(res.data, id).then(function (resp) {
                $scope.list = resp.data;
            });
        });
    };
    $scope.displayWatchLaterList();
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

    var serverUrl = 'http://localhost:3012';
    this.videoData = '';
    this.video = '';
    this.arr = [];
    this.searchedVideo = function (data) {
        _this.videoData = data;
    };
    this.clickedVideo = function (videoLink) {
        _this.video = videoLink;
    };
    this.getId = function (id) {
        _this.arr.push(id);
        if (_this.arr.length > 1) {
            while (_this.arr.length > 1) {
                _this.arr.shift();
            }
        }
    };
    this.getVideosByChannel = function (channel) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/channels/' + channel)
        });
    };
    this.searchVideos = function (page, query) {
        _this.query = query;
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/' + page + '?search=' + query)
        });
    };
    this.getVideoById = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos?id=' + id)
        });
    };
    this.getComments = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/' + id + '/comments')
        });
    };
    this.postComment = function (id, text) {
        return $http({
            method: 'POST',
            data: { text: text },
            url: serverUrl + ('/api/videos/' + id + '/comments')
        });
    };
    this.login = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/login'
        });
    };
    this.logout = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/logout'
        });
    };
    this.getUser = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/currentuser'
        });
    };
    this.uploadVideo = function () {
        return $http({
            method: 'POST',
            url: serverUrl + '/api/upload'
        });
    };
    this.userVideos = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        });
    };
    this.getAccessToken = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/accesstoken'
        });
    };
    this.addToWatchLater = function (video, id) {
        return $http({
            method: 'POST',
            data: { video: video },
            url: serverUrl + ('/api/videos/' + id + '/watchlater')
        });
    };
    this.getWatchLaterList = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        });
    };
}]);
//# sourceMappingURL=bundle.js.map
