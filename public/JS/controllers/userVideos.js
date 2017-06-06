angular.module('vimeoApp').controller('userVideosCtrl', function ($scope, mainService, $state) {

    $scope.userVideos = () => {
        mainService.userVideos().then(res => {
            $scope.videos = res.data.data;
            console.log($scope.videos);

            // var seconds=res.data.data.duration;
            // function convertTime = (seconds) => {
            //   var minutes = Math.floor(seconds / 60); // 7
            //   var seconds = seconds % 60; // 30
            //   $scope.convertedTime=minutes+":"+seconds;
            // }

        })
    }
    $scope.userVideos();

    $scope.play = (videoLink, uri) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    }
    $scope.displayWatchLaterList = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            mainService.getWatchLaterList(res.data, id).then(resp => {
                $scope.list = resp.data;
            })
        })

    }
    $scope.displayWatchLaterList();
});
