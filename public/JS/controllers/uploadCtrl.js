angular.module('vimeoApp').controller('uploadCtrl', function ($scope, mainService, $state) {
    $scope.upload = () => {
        mainService.uploadVideo($scope.video).then(res => {
            console.log(res.data);
            $state.go('userVideos');
        })
    }
});
