angular.module('vimeoApp').controller('playVideo', function ($scope, mainService) {

    $scope.video = mainService.video;

    $scope.playVideo = (videoLink, uri) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $scope.video = mainService.arr2[mainService.arr2.length -1];
        console.log($scope.video);
        document.querySelector(".video-window").innerHTML = $scope.video;
        $scope.getVideo();
        $scope.getAllComments();
        $scope.getChannelVideos2();
    };
    $scope.getVideo = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            $scope.media = res.data

            var beforeDate=res.data.created_time;
            function date (beforeDate){
              var newD=beforeDate.slice(0,10);
              var splitDate=newD.split('')
              var noDash=splitDate.filter(function(numb){
                return numb!=='-';
              })
              var forMoment=noDash.join("")
              $scope.momentTime=moment(forMoment, "YYYYMMDD").fromNow();
            }

date("2017-05-31T14:33:14+00:00")

            $scope.dateTest=moment("20170601", "YYYYMMDD").fromNow();
        })
    };
    $scope.getVideo();

    $scope.getAllComments = id => {
        id = mainService.arr[0];
        mainService.getComments(id).then(res => {
            $scope.comments = res.data.data;
        })
    }
    $scope.getAllComments();

    $scope.addComment = () => {
        let id = mainService.arr[0];
        mainService.postComment(id, $scope.text).then(res => {
            $scope.getAllComments(id);
        })
    };
    $scope.getChannelVideos = () => {
        mainService.getVideosByChannel('staffpicks').then(res => {
            $scope.staffpicks = res.data.data;
        })
    }
    $scope.getChannelVideos();
    $scope.getChannelVideos2 = () => {
        mainService.getVideosByChannel('music').then(res => {
            $scope.staffpicks = res.data.data;
        })
    }

    document.querySelector(".video-window").innerHTML = $scope.video;
});
