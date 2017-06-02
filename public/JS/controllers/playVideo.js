angular.module('vimeoApp').controller('playVideo', function ($scope, mainService) {


    $scope.video = mainService.video;

    let id = mainService.arr[0];

    mainService.getComments(id).then(res => {
        console.log("res.data.data" , res.data.dat)
        $scope.comments = res.data.data;
    })



    $scope.addComment = (comment) => {
        console.log('comment' , comment)
        mainService.postComment(id, comment).then(res => {
            $scope.addComments = res.data.data;
            // console.log('comments' , comments)
            console.log('$scope.addComments' , $scope.addComments)
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
