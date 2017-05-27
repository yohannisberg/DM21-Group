angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

    function test2() {
        $scope.videos = mainService.videoData;
    }
    test2();

    $scope.getVideoID = (id) => {
        mainService.getId(id);
    }

    $scope.playVideo = function (videoLink) {
        mainService.clickedVideo(videoLink);
        $state.go('playVideo')
    }
    let query;

    $scope.page = (num) => {
        query = mainService.query;
        mainService.searchVideos(num, query).then(res => {
            $scope.videos = res.data.data
        })
    }

});
