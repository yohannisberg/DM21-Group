angular.module('vimeoApp').controller('navBarCtrl', function ($scope, mainService, $state) {

  $scope.profilePicAndUpload=false;

  $scope.logInNavBar=true;

  $scope.mainDropDown=true;

  // $scope.login = () => {
  //     mainService.login().then(res => {
  //       console.log(res.data)
  //         $scope.data = res.data;
  //     })
  // }
  // $scope.login();

    $scope.searchQuery = query => {
        $state.go('loading');
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
            // console.log(res.data); //res.data is the currently logged-in user's info
        })
    }

    $scope.checkUser = () => {
      mainService.getUser().then(res => {
        // console.log(res.data)

        if(res.data.name){
          $scope.logInNavBar=false;
          $scope.profilePicture=res.data.pictures[3].link;
          $scope.userName=res.data.name;
          $scope.profilePicAndUpload=true;
        }
      })
    }

    $scope.checkUser();
});
