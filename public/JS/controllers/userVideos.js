angular.module('vimeoApp').controller('userVideosCtrl', function ($scope, mainService) {
    $scope.userVideos = () => {
        mainService.userVideos().then(res => {
            $scope.videos = res.data;
            console.log($scope.videos);
        })
    }
});
