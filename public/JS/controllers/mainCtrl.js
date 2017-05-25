angular.module('vimeoApp').controller('mainCtrl', function ($scope, mainService) {

    $scope.login = () => {
        mainService.login().then(res => {
            $scope.data = res.data;
            console.log($scope.data);
        })
    }
    $scope.login();
});
