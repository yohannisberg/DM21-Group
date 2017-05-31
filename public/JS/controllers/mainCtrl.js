angular.module('vimeoApp').controller('mainCtrl', function ($scope, mainService, $state) {

    $scope.login = () => {
        mainService.login().then(res => {
            $scope.data = res.data;
        })
    }
    $scope.login();

    $scope.playVideo = (videoLink, uri) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    }

    mainService.getVideosByChannel('staffpicks').then(res => {
            console.log(res.data.data)
            $scope.staffpicks = res.data.data;
        })

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
});
