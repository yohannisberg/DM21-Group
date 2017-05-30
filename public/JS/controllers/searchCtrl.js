angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

    function test2() {
      console.log(mainService.videoData)
        $scope.videos = mainService.videoData;
    }
    test2();

    $scope.getVideoID = id => {
        mainService.getId(id);
    }

    $scope.playVideo = videoLink => {
        mainService.clickedVideo(videoLink);
        $state.go('playVideo')
    }

    $scope.page = num => {
        mainService.searchVideos(num, mainService.query).then(res => {
            $scope.videos = res.data.data
        })
    }
});
