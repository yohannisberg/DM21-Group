angular.module('vimeoApp').controller('searchCtrl', function ($scope, mainService) {

  function test(){
    mainService.searchVideos('cat').then(function(response){
      console.log(response.data.data)
    $scope.videos=response.data.data;

  })
  }

  test()
});
