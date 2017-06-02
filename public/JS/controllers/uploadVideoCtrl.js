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
                let link = res.data.upload_link_secure;
                $http({
                    method: 'POST',
                    url: link,
                    data: $scope.video
                }).then(res => {
                    console.log(res);
                })
            })
        })
    }
});
