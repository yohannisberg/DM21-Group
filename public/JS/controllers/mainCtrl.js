angular.module('vimeoApp').controller('mainCtrl', function ($scope, mainService) {

    $scope.login = () => {
        mainService.login().then(res => {
        console.log(res);
        })
    }
});
