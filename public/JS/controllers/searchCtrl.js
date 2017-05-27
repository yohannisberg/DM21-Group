angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

    function test2() {
        $scope.videos = mainService.videoData;
        console.log($scope.videos)
    }
    test2();

    // function test(){
    //   mainService.searchVideos().then(function(response){
    //     $scope.videos=response.data.data;
    // })
    // }
    // test()

    $scope.getVideoID = (id) => {
        console.log(id);
        mainService.getId(id);
    }

    $scope.playVideo = function (videoLink) {
        mainService.clickedVideo(videoLink);
        $state.go('playVideo')
    }

});
