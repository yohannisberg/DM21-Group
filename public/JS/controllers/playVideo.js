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
    }
    $scope.getVideo();

    mainService.getVideosByChannel('staffpicks').then(res => {
        $scope.staffpicks = res.data.data;
    })

    document.querySelector(".video-window").innerHTML = $scope.video;
});
