angular.module('vimeoApp').controller('uploadVideoCtrl', function ($scope, mainService, $state) {
    $scope.upLoad = () => {
        mainService.uploadVideo().then(res => {
            console.log(res.data);
            $scope.link = JSON.stringify(res.data);
        })
    }
});
