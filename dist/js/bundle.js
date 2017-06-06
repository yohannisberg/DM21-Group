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
    $scope.logout = function () {
        mainService.logout().then(function (res) {
            var loggedOut = res.data;
            $scope.logInNavBar = loggedOut;
            $scope.profilePicAndUpload = !loggedOut;
            $scope.mainDropDown = loggedOut;
            $state.go('home');
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

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

angular.module('vimeoApp').controller('playVideo', ["$scope", "mainService", function ($scope, mainService) {

    $scope.video = mainService.video;

    $scope.getChannelVideos = function () {
        mainService.getVideosByChannel('staffpicks').then(function (res) {
            $scope.staffpicks = res.data.data;
            $scope.playVideo = function (videoLink, uri, video) {
                mainService.clickedVideo(videoLink);
                var id = uri.replace(/\D/g, ''),
                    stripDuplicates = function stripDuplicates(a) {
                    return [].concat(_toConsumableArray(new Set(a)));
                };
                mainService.getId(id);
                $scope.video = mainService.arr2[mainService.arr2.length - 1];
                document.querySelector(".video-window").innerHTML = $scope.video;
                $scope.getVideo();
                $scope.getAllComments();
                $scope.staffpicks.unshift(video);
                $scope.staffpicks = stripDuplicates($scope.staffpicks);
            };
        });
    };
    $scope.getChannelVideos();
    $scope.getVideo = function () {
        var id = mainService.arr[0];
        mainService.getVideoById(id).then(function (res) {
            $scope.media = res.data;
            var beforeDate = res.data.created_time,
                date = function date(beforeDate) {
                var newD = beforeDate.slice(0, 10),
                    splitDate = newD.split(''),
                    noDash = splitDate.filter(function (numb) {
                    return numb !== '-';
                });
                var forMoment = noDash.join("");
                $scope.momentTime = moment(forMoment, "YYYYMMDD").fromNow();
            };
            date(beforeDate);
            $scope.dateTest = moment("20170601", "YYYYMMDD").fromNow();
        });
    };
    $scope.getVideo();
    $scope.getAllComments = function (id) {
        id = mainService.arr[0];
        mainService.getComments(id).then(function (res) {
            $scope.comments = res.data.data;
        });
    };
    $scope.getAllComments();
    $scope.addComment = function () {
        var id = mainService.arr[0];
        mainService.postComment(id, $scope.text).then(function (res) {
            $scope.getAllComments(id);
        });
    };
    document.querySelector(".video-window").innerHTML = $scope.video;
}]);
'use strict';

angular.module('vimeoApp').controller('searchCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    var test2 = function test2() {
        $scope.videos = mainService.videoData;
    };
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
    // $scope.addToWatchLaterList = () => {
    //     mainService.getVideoById
    //     mainService.addToWatchLater(video, id).then(res => {
    //         console.log(res);
    //     });
    // };
}]);
"use strict";
'use strict';

angular.module('vimeoApp').controller('uploadVideoCtrl', ["$scope", "mainService", function ($scope, mainService) {
    $scope.link = '';
    // $scope.uploadVideo = function () {
    //     mainService.getAccessToken().then(resp => {
    //         $http({
    //             method: 'POST',
    //             url: 'https://api.vimeo.com/me/videos',
    //             headers: {Authorization: `Bearer ${resp.data.access_token}`},
    //             data: {
    //                 type: 'POST',
    //             }
    //         }).then(res => {
    //             console.log(res);
    //             // $http({
    //             //     method: 'put',
    //             //     url: `https://1234.cloud.vimeo.com/upload?ticket_id=${res.data.ticket_id}`,
    //             //     headers: {
    //             //         Host: '1.2.3.4:3012',
    //             //         'Content-Length': 339108,
    //             //         'Content-Type': 'video/mp4',
    //             //         .... ....
    //             //     }
    //             // })
    //         })
    //     })
    // }
    // $scope.uploadVideo = () => {
    //     mainService.uploadVid($scope.video).then(res => {
    //         console.log(res);
    //     })
    // }
    $scope.uploadFile = function () {
        mainService.uploadVid($scope.myFile).then(function (res) {
            console.log(res);
        });
    };
}]);
'use strict';

angular.module('vimeoApp').controller('userVideosCtrl', ["$scope", "mainService", "$state", function ($scope, mainService, $state) {

    $scope.userVideos = function () {
        mainService.userVideos().then(function (res) {
            $scope.videos = res.data.data;

            // // let seconds = res.data.data.duration,
            //    let convertTime = seconds => {
            //         let minutes = Math.floor(seconds / 60),  // 7
            //             seconds = seconds % 60; // 30
            //         $scope.convertedTime = minutes + ":" + seconds;
            //     };
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

angular.module('vimeoApp').directive('fileUploader', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            var model = $parse(attrs.fileUploader),
                modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
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
    var serverUrl = 'http://localhost:3012',
        vm = this;
    vm.videoData = '';
    vm.video = '';
    vm.arr = [];
    vm.arr2 = [];
    vm.searchedVideo = function (data) {
        vm.videoData = data;
    };
    vm.clickedVideo = function (videoLink) {
        vm.video = videoLink;
        vm.arr2.push(videoLink);
    };
    vm.getId = function (id) {
        vm.arr.push(id);
        if (vm.arr.length > 1) {
            while (vm.arr.length > 1) {
                vm.arr.shift();
            };
        };
    };
    vm.getVideosByChannel = function (channel) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/channels/' + channel)
        });
    };
    vm.searchVideos = function (page, query) {
        vm.query = query;
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/' + page + '?search=' + query)
        });
    };
    vm.getVideoById = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos?id=' + id)
        });
    };
    vm.getComments = function (id) {
        return $http({
            method: 'GET',
            url: serverUrl + ('/api/videos/' + id + '/comments')
        });
    };
    vm.postComment = function (id, text) {
        return $http({
            method: 'POST',
            data: { text: text },
            url: serverUrl + ('/api/videos/' + id + '/comments')
        });
    };
    vm.login = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/login'
        });
    };
    vm.logout = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/logout'
        });
    };
    vm.getUser = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/currentuser'
        });
    };
    // this.uploadVideo = (video) => {
    //     return $http({
    //         method: 'POST',
    //         data: {video},
    //         url: serverUrl + '/api/upload'
    //     })
    // };
    vm.uploadVid = function (video) {
        return $http({
            method: 'POST',
            data: { video: video },
            url: serverUrl + '/api/uploadvideo'
        });
    };
    vm.userVideos = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        });
    };
    vm.getAccessToken = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/accesstoken'
        });
    };
    vm.addToWatchLater = function (video, id) {
        return $http({
            method: 'POST',
            data: { video: video },
            url: serverUrl + ('/api/videos/' + id + '/watchlater')
        });
    };
    vm.getWatchLaterList = function () {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        });
    };
}]);
//# sourceMappingURL=bundle.js.map
