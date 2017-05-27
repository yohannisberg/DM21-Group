angular.module('vimeoApp').service('mainService', function ($http) {
    let serverUrl = 'http://localhost:3001'

    this.videoData='';

    this.searchedVideo = function(data){
      this.videoData = data;
    }
    this.id = '';

    this.getId = (id) => {
        this.id = id;
    }

    this.video='';

    this.clickedVideo = function(videoLink){
      this.video = videoLink;
    }

    this.searchVideos = (query) => {
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
    };
    this.getUser = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/currentuser'
        })
    }


});

