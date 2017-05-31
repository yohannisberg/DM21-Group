angular.module('vimeoApp').controller('navBarCtrl', function ($scope, mainService, $state) {

    $scope.searchQuery = query => {
        $state.go('home');
        mainService.searchVideos(1, query).then(response => {
            mainService.searchedVideo(response.data.data);
             console.log(response.data.data);
            $state.go('search');
            $scope.query = '';
        })
    }
    $scope.getUser = () => {
        $state.go('uploadVideo');
        mainService.getUser().then(res => {
            console.log(res.data); //res.data is the currently logged-in user's info
        })
    }
});
