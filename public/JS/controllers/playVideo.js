angular.module('vimeoApp').controller('playVideo', function ($scope, mainService) {
    $scope.video = mainService.video;

    let id = mainService.arr[0];

    mainService.getComments(id).then(res => {
        $scope.comments = res.data.data;
        console.log($scope.comments);
    })
    $scope.addComment = () => {
        mainService.postComment(id, $scope.text).then(res => {
            console.log(res);
        })
        mainService.getComments(id).then(res => {
            $scope.comments = res.data.data;
            console.log('yo', $scope.comments);
        })
    }
    document.querySelector(".video-window").innerHTML = $scope.video;
     console.log($scope.video);
});
