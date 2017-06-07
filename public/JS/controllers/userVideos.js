angular.module('vimeoApp')

.filter('firstLetter', function () {
    return function(privacy){

      var split=privacy.split("");
      var firstCap=split[0].toUpperCase();
      var restofWord=split.splice(0,1);
      var scope=firstCap+split.join("");

      return scope;
    }
  })

  .filter('convertedTime', function() {
    return function(time){

      console.log(time)

            let numb=parseInt(time);
            let minutes = Math.floor(numb / 60);
            let seconds = numb % 60;

               if(minutes===0){
                 if(seconds.toString().length===1){
                   console.log(minutes)
                   return minutes+ "0" + ":" + "0"+seconds;
                 }
                 console.log(minutes)
                 return minutes + "0" + ":" + seconds;
               }

              else if(seconds.toString().length===1){
                console.log(minutes)
                return minutes+":"+"0"+seconds;
               }
               console.log(minutes)
               return minutes+":"+seconds;
       }
    })

.controller('userVideosCtrl', function ($scope, mainService, $state) {
    $scope.userVideos = () => {
        mainService.userVideos().then(res => {
            $scope.videos = res.data.data;

        });
    };
    $scope.userVideos();

    $scope.play = (videoLink, uri) => {
        mainService.clickedVideo(videoLink);
        let id = uri.replace(/\D/g, '');
        mainService.getId(id);
        $state.go('playvideo');
    };
    $scope.displayWatchLaterList = () => {
        let id = mainService.arr[0];
        mainService.getVideoById(id).then(res => {
            mainService.getWatchLaterList(res.data, id).then(resp => {
                $scope.list = resp.data;
            });
        });
    };
    $scope.displayWatchLaterList();
});
