angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService, $state) {

  function test2(){
    $scope.videos=mainService.videoData;
  }

  test2();

  $scope.playVideo=function(videoLink){
    console.log(videoLink)
    mainService.clickedVideo(videoLink);
    $state.go('playVideo')
  }

//   $scope.convertNum=function(num) {
//      if (num >= 1000000000) {
//         $scope.numb=(num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
//      }
//      else if (num >= 1000000) {
//         $scope.numb= (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
//      }
//      else if (num >= 1000) {
//         $scope.numb= (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
//      }
//      $scope.numb= num;
// }
//   $scope.convertNum();

});
