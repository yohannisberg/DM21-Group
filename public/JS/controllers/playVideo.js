angular.module('vimeoApp').controller('playVideoCtrl', function ($scope, mainService) {
    $scope.video = mainService.video;

    let id = mainService.id.replace(/\D/g, '');

    mainService.getComments(id).then(res => {
        $scope.comments = res.data.data;
        console.log($scope.comments);
    })
    document.querySelector(".videoHolder").innerHTML = $scope.video;

});
