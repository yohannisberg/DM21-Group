angular.module('vimeoApp').controller('mainCtrl', function ($scope, mainService) {

    $scope.login = () => {
        mainService.login().then(res => {
            $scope.data = res.data;
        })
    }
    $scope.login();

    // mainService.getVideosByChannel('staffpicks').then(res => {
    //     $scope.staffpicks = res.data;
    // })
    //
    // mainService.getVideosByChannel('music').then(res => {
    //     $scope.music = res.data;
    // })
    // mainService.getVideosByChannel('animation').then(res => {
    //     $scope.animation = res.data;
    // })
});
