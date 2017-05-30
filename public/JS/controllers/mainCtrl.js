angular.module('vimeoApp').controller('mainCtrl', function ($scope, mainService) {

    $scope.login = () => {
        mainService.login().then(res => {
            $scope.data = res.data;
        })
    }
    $scope.login();

    mainService.getVideosByChannel('staffpicks').then(res => {
            console.log(res.data.data)
            $scope.staffpicks = res.data.data;
        })


});
