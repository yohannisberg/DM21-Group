angular.module('vimeoApp').controller('userVideosCtrl', function ($scope, mainService, $state) {
    $scope.userVideos = () => {
        mainService.userVideos().then(res => {
            $scope.videos = res.data.data;
            console.log($scope.videos);
        })
    }
    $scope.userVideos();

    $scope.play = (videoLink, uri) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    }

    $scope.testing=function(number){
      console.log(number)
      var yup=number + "yup";
      $scope.yup;
    }

});
