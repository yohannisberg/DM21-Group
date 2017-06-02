angular.module('vimeoApp').controller('loadingCtrl', function ($scope, $timeout) {

    $scope.loadB = true;
    $scope.loadG = false;
    $scope.loadR = false;

    $timeout();

    $timeout(function () {
        $scope.loadG = true;
    }, 500);

    $timeout();

    $timeout(function () {
        $scope.loadR = true;
    }, 1000);

    $timeout();

});
