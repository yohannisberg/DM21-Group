angular.module('vimeoApp').controller('playVideo', function ($scope, mainService) {

// $scope.comments= {}
// $scope.testcomments = [1,2,3,4,5,6,7]


    $scope.video = mainService.video;

    let id = mainService.arr[0];

    mainService.getComments(id).then(res => {
        $scope.comments = res.data.data;
        // console.log($scope.comments);
    })
    $scope.addComment = () => {
        mainService.postComment(id, $scope.text).then(res => {
            console.log(res);
        })
        mainService.getComments(id).then(res => {
            $scope.comments = res.data.data;
            // console.log($scope.comments);
        })
    }


    // $scope.getVideo = () => {
        mainService.getVideoById(id).then(res => {
            console.log(res.data)
            $scope.media = res.data
            
        })
    // }

    mainService.getVideosByChannel('staffpicks').then(res => {
        console.log(res.data.data)
        $scope.staffpicks = res.data.data;
    })


    document.querySelector(".video-window").innerHTML = $scope.video;
    //  console.log($scope.video);
});
