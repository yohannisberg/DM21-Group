angular.module('vimeoApp').service('mainService', function ($http, $state) {
    let serverUrl = 'http://localhost:3001'

    this.videoData='';

    this.searchedVideo=function(data){
      this.videoData=data;
    }

    console.log(this.videoData)

    this.video='';

    this.clickedVideo=function(videoLink){
      this.video=videoLink;
    }

    this.searchVideos = (query) => {
      console.log(query)
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos?search=' + query
        })
    };

    this.getVideoById = (id) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + id
        })
    };
    this.getComments = id => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + id + '/comments'
        })
    }
    this.postComment = id => {
        return $http({
            method: 'POST',
            data: '',
            url: serverUrl + '/api/comments/' + id
        })
    };

    this.login = () => {
        return $http({

            method: 'GET',
            url: serverUrl + '/api/login'
        })
    }

});
