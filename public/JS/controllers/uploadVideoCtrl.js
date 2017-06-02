angular.module('vimeoApp').controller('uploadVideoCtrl', function ($scope, mainService, $state, $http) {

    $scope.getAccessToken = () => {
        mainService.getAccessToken().then(resp => {
            $http({
                method: 'POST',
                url: 'https://api.vimeo.com/me/videos',
                headers: {Authorization: `Bearer ${resp.data.access_token}`},
                data: {
                    type: 'POST',
                    redirect_url: `http://localhost:3012/#!/userVideos`
                }
            }).then(res => {
                $scope.link = res.data.upload_link_secure;
                console.log(res);
            })
        })
    }

    // console.log($scope.access_token);  ?? why doesn't it bind to scope?

    $scope.submitVideo = () => {
        $http({
            method: 'POST',
            url: $scope.link,
            data: $scope.video
        })
    }
});
