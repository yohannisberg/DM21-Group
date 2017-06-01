angular.module('vimeoApp').service('mainService', function ($http) {
    let serverUrl = 'http://localhost:3012'

    this.videoData = '';

    this.searchedVideo = function (data) {
        this.videoData = data;
    }

    this.id = '';

    this.arr = [];


    this.getId = (id) => {
        this.arr.push(id);
        if(this.arr.length > 1){
            while(this.arr.length > 1){
                this.arr.shift();
            }
        }
    }

    this.video = '';

    this.clickedVideo = function (videoLink) {
        this.video = videoLink;
    }

    this.getVideosByChannel = (channel) => {
        return $http({
            method: 'GET',
            url: serverUrl + `/api/videos/channels/${channel}`

       })
    }

    this.searchVideos = (page, query) => {
        this.query = query;
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + page + '?search=' + query
        })
    };
    this.getVideoById = (id) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos?id=' + id
        })
    };
    this.getComments = id => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + id + '/comments'
        })
    }
    this.postComment = (id, text) => {
        return $http({
            method: 'POST',
            data: {text},
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
    };
    this.uploadVideo = () => {
        return $http({
            method: 'PUT',
            url: serverUrl + '/api/upload'
        })
    };
    this.userVideos = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        })
    };
});
