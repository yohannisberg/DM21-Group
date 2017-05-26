angular.module('vimeoApp').controller('playVideoCtrl', function ($scope, mainService) {
  $scope.video=mainService.video;

  // $scope.testVid=response.data.data[1].embed.html;
  // console.log("hi", typeof $scope.testVid)
  //
  document.querySelector(".videoHolder").innerHTML=$scope.video

});
