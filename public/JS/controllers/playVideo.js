angular.module('vimeoApp').controller('playVideo', function ($scope, mainService) {


    $scope.video = mainService.video;

    let id = mainService.arr[0];

    mainService.getComments(id).then(res => {
        $scope.comments = res.data.data;
    })
    $scope.addComment = () => {
        mainService.postComment(id, $scope.text).then(res => {
        })
        mainService.getComments(id).then(res => {
            $scope.comments = res.data.data;
        })
    }

    $scope.getVideo = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            $scope.media = res.data
        })
    }
    $scope.getVideo();

    mainService.getVideosByChannel('staffpicks').then(res => {
        console.log(res.data.data)
        $scope.staffpicks = res.data.data;
    })


    document.querySelector(".video-window").innerHTML = $scope.video;
});
