angular.module('vimeoApp').controller('navBarCtrl', function ($scope, mainService, $state) {

    $scope.searchQuery = function (query) {
        $state.go('home');
        mainService.searchVideos(query).then(function (response) {
            mainService.searchedVideo(response.data.data);
            $state.go('search');
            $scope.query = '';
        })
    }
    $scope.getUser = () => {
        mainService.getUser().then(res => {
            console.log(res.data); //res.data is the currently logged-in user's info
        })
    }
});
