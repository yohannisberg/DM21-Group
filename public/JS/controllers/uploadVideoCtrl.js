angular.module('vimeoApp').controller('uploadVideoCtrl', function ($scope, mainService) {
    $scope.link = '';
    // $scope.uploadVideo = function () {
    //     mainService.getAccessToken().then(resp => {
    //         $http({
    //             method: 'POST',
    //             url: 'https://api.vimeo.com/me/videos',
    //             headers: {Authorization: `Bearer ${resp.data.access_token}`},
    //             data: {
    //                 type: 'POST',
    //             }
    //         }).then(res => {
    //             console.log(res);
    //             // $http({
    //             //     method: 'put',
    //             //     url: `https://1234.cloud.vimeo.com/upload?ticket_id=${res.data.ticket_id}`,
    //             //     headers: {
    //             //         Host: '1.2.3.4:3012',
    //             //         'Content-Length': 339108,
    //             //         'Content-Type': 'video/mp4',
    //             //         .... ....
    //             //     }
    //             // })
    //         })
    //     })
    // }
    // $scope.uploadVideo = () => {
    //     mainService.uploadVid($scope.video).then(res => {
    //         console.log(res);
    //     })
    // }
    $scope.uploadFile = () => {
        mainService.uploadVid($scope.myFile).then(res => {
            console.log(res);
        });
    };
});
