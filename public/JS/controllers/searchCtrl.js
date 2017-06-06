angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

    let test2 = () => {
        $scope.videos = mainService.videoData;
    };
    test2();

    $scope.getVideoID = id => {
        mainService.getId(id);
    };
    $scope.playVideo = (videoLink, uri) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    };
    $scope.page = num => {
        mainService.searchVideos(num, mainService.query).then(res => {
            $scope.videos = res.data.data;
        });
    };
    // $scope.addToWatchLaterList = () => {
    //     mainService.getVideoById
    //     mainService.addToWatchLater(video, id).then(res => {
    //         console.log(res);
    //     });
    // };
});
