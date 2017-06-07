angular.module('vimeoApp').controller('commentsCtrl', function ($scope, mainService) {

  $scope.getAllComments = () => {
    console.log('hi')
      let id = mainService.arr[0];
      mainService.getComments(id).then(res => {
          $scope.comments = res.data.data;
          console.log($scope.comments)
      });
  }
  $scope.addComment = () => {
      let id = mainService.arr[0];
      console.log(id)
      mainService.postComment(id, $scope.text).then(res => {
          $scope.getAllComments();
          $scope.text='';
      });
  };

  $scope.getAllComments();

});
