angular.module('vimeoApp').controller('playVideo', function ($scope, mainService, $state) {

    $scope.video = mainService.video;

    let id = mainService.arr[0];

    mainService.getComments(id).then(res => {
        $scope.comments = res.data.data;
    })

    $scope.addComment = () => {
        let id = mainService.arr[0];
        console.log(id);
        console.log($scope.text);
        mainService.postComment(id, $scope.text).then(res => {
            mainService.getComments(id).then(res => {
                $scope.comments = res.data.data;
            })
        })
    }
    $scope.playVideo = (videoLink, uri) => {
        $state.go('loading');
        console.log(videoLink, uri);
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    }

    $scope.getVideo = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            $scope.media = res.data
        })
    }
    $scope.getVideo();

    mainService.getVideosByChannel('staffpicks').then(res => {
        $scope.staffpicks = res.data.data;
    })

    document.querySelector(".video-window").innerHTML = $scope.video;
});
