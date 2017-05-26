angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

  function test2(){
    $scope.videos=mainService.videoData;
  }

  test2();

  // function test(){
  //   mainService.searchVideos().then(function(response){
  //     $scope.videos=response.data.data;
  // })
  // }
  // test()

  $scope.playVideo=function(videoLink){
    console.log(videoLink)
    mainService.clickedVideo(videoLink);
    $state.go('playVideo')
  }

});
