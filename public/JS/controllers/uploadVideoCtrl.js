angular.module('vimeoApp').controller('uploadVideoCtrl', function ($scope, mainService, $state) {

    $scope.uploadVideo = () => {
      $state.go('userVideos')
        mainService.uploadVid($scope.video).then(res => {
          console.log(res)
        })
    }

});
