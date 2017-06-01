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
    });
}]);
'use strict';

angular.module('vimeoApp').controller('accountCtrl', ["$scope", function ($scope) {}]);
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
        console.log(res.data.data);
        $scope.staffpicks = res.data.data;
    });

    // mainService.getVideosByChannel('staffpicks').then(res => {
    //     $scope.staffpicks = res.data;
    //     console.log($scope.staffpicks);
    // })
    //
    // mainService.getVideosByChannel('music').then(res => {
    //     $scope.music = res.data;
    // })
    // mainService.getVideosByChannel('animation').then(res => {
    //     $scope.animation = res.data;
    // })
}]);
'use strict';

angular.module('vimeoApp').controller('navBarCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    $scope.profilePicAndUpload = false;

    $scope.logInNavBar = true;

    $scope.mainDropDown = true;

    // $scope.login = () => {
    //     mainService.login().then(res => {
    //       console.log(res.data)
    //         $scope.data = res.data;
    //     })
    // }
    // $scope.login();

    $scope.searchQuery = function (query) {
        $state.go('home');
        mainService.searchVideos(1, query).then(function (response) {
            mainService.searchedVideo(response.data.data);
            console.log(response.data.data);
            $state.go('search');
            $scope.query = '';
        });
    };
    $scope.getUser = function () {
        $state.go('uploadVideo');
        mainService.getUser().then(function (res) {
            // console.log(res.data); //res.data is the currently logged-in user's info
        });
    };

    $scope.checkUser = function () {
        mainService.getUser().then(function (res) {
            // console.log(res.data)

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

angular.module('vimeoApp').controller('playVideo', ["$scope", "mainService", function ($scope, mainService) {

    // $scope.comments= {}
    // $scope.testcomments = [1,2,3,4,5,6,7]


    $scope.video = mainService.video;

    var id = mainService.arr[0];

    mainService.getComments(id).then(function (res) {
        $scope.comments = res.data.data;
        // console.log($scope.comments);
    });
    $scope.addComment = function () {
        mainService.postComment(id, $scope.text).then(function (res) {
            console.log(res);
        });
        mainService.getComments(id).then(function (res) {
            $scope.comments = res.data.data;
            // console.log($scope.comments);
        });
    };

    // $scope.getVideo = () => {
    mainService.getVideoById(id).then(function (res) {
        console.log(res.data);
        $scope.media = res.data;
    });
    // }

    mainService.getVideosByChannel('staffpicks').then(function (res) {
        console.log(res.data.data);
        $scope.staffpicks = res.data.data;
    });

    document.querySelector(".video-window").innerHTML = $scope.video;
    //  console.log($scope.video);
}]);
'use strict';

angular.module('vimeoApp').controller('searchCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    function test2() {
        console.log(mainService.videoData);
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
}]);
"use strict";
'use strict';

angular.module('vimeoApp').controller('uploadVideoCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {
    $scope.upLoad = function () {
        mainService.uploadVideo().then(function (res) {
            console.log(res.data);
            $scope.link = JSON.stringify(res.data);
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
}]);
'use strict';

angular.module('vimeoApp').service('mainService', ["$http", function ($http) {
    var _this = this;

    var serverUrl = 'http://localhost:3012';

    this.videoData = '';

    this.searchedVideo = function (data) {
        this.videoData = data;
    };

    this.id = '';

    this.arr = [];
    console.log(this.arr);

    this.getId = function (id) {
        _this.arr.push(id);
    };

    this.video = '';

    this.clickedVideo = function (videoLink) {
        this.video = videoLink;
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
            url: serverUrl + '/api/videos/' + page + '?search=' + query
        });
    };
    this.getVideoById = function (id) {
        console.log("getVideoById", id);
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
    this.postComment = function (id, text) {
        return $http({
            method: 'POST',
            data: { text: text },
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
    this.uploadVideo = function () {
        return $http({
            method: 'PUT',
            url: serverUrl + '/api/upload'
        });
    };
    this.userVideos = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        });
    };
    //this getVideosByChannel is a duplicate?
    this.getVideosByChannel = function (channel) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/channels/' + channel)
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
//# sourceMappingURL=bundle.js.map
