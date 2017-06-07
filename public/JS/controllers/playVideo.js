angular.module('vimeoApp').controller('playVideo', function ($scope, mainService) {

    $scope.video = mainService.video;

    $scope.getChannelVideos = () => {
        mainService.getVideosByChannel('staffpicks').then(res => {
            $scope.staffpicks = res.data.data;
            $scope.playVideo = (videoLink, uri, video) => {
                mainService.clickedVideo(videoLink);
                let id = uri.replace(/\D/g, ''),
                    stripDuplicates = a => [...new Set(a)];
                mainService.getId(id);
                $scope.video = mainService.arr2[mainService.arr2.length - 1];
                document.querySelector(".video-window").innerHTML = $scope.video;
                $scope.getVideo();
                $scope.getAllComments();
                $scope.staffpicks.unshift(video);
                $scope.staffpicks = stripDuplicates($scope.staffpicks);
            };
        });
    };
    $scope.getChannelVideos();
    $scope.getVideo = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            $scope.media = res.data;
            console.log('$scope.media' , $scope.media)
            let beforeDate = res.data.created_time,
                date = x => {
                    let newD = x.slice(0, 10),
                        splitDate = newD.split(''),
                        noDash = splitDate.filter(numb => {
                            return numb !== '-';
                        });
                    let forMoment = noDash.join("");
                    $scope.momentTime = moment(forMoment, "YYYYMMDD").fromNow();
                };
            date(beforeDate);
            date("2017-05-31T14:33:14+00:00");
            $scope.dateTest = moment("20170601", "YYYYMMDD").fromNow();
        });
    };
    $scope.getVideo();
    $scope.getAllComments = id => {
        id = mainService.arr[0];
        mainService.getComments(id).then(res => {
            $scope.comments = res.data.data;
        });
    };
    $scope.getAllComments();
    $scope.addComment = () => {
        let id = mainService.arr[0];
        mainService.postComment(id, $scope.text).then(res => {
            $scope.getAllComments(id);
        });
    };
    document.querySelector(".video-window").innerHTML = $scope.video;
});

