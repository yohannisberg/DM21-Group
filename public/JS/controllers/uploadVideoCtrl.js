angular.module('vimeoApp').controller('uploadVideoCtrl', function ($scope, mainService, $state) {
    $scope.upLoad = () => {
        mainService.uploadVideo().then(res => {
            console.log('hey', res.data);
            $scope.link = res.data;
        })
    }
});
