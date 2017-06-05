angular.module('vimeoApp').service('mainService', function ($http) {
    let serverUrl = 'http://localhost:3012';
    this.videoData = '';
    this.video = '';
    this.arr = [];
    this.arr2 = [];

    this.searchedVideo = data => {
        this.videoData = data;
    };
    this.clickedVideo = videoLink => {
        this.video = videoLink;
        this.arr2.push(videoLink);
    };
    this.getId = id => {
        this.arr.push(id);
        if (this.arr.length > 1) {
            while (this.arr.length > 1) {
                this.arr.shift();
            }
        }
    };
    this.getVideosByChannel = channel => {
        return $http({
            method: 'GET',
            url: serverUrl + `/api/videos/channels/${channel}`
        })
    };
    this.searchVideos = (page, query) => {
        this.query = query;
        return $http({
            method: 'GET',
            url: serverUrl + `/api/videos/${page}?search=${query}`
        })
    };
    this.getVideoById = id => {
        return $http({
            method: 'GET',
            url: serverUrl + `/api/videos?id=${id}`
        })
    };
    this.getComments = id => {
        return $http({
            method: 'GET',
            url: serverUrl + `/api/videos/${id}/comments`
        })
    };
    this.postComment = (id, text) => {
        return $http({
            method: 'POST',
            data: {text},
            url: serverUrl + `/api/videos/${id}/comments`
        })
    };
    this.login = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/login'
        })
    };
    this.logout = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/logout'
        })
    }
    this.getUser = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/currentuser'
        })
    };
    // this.uploadVideo = (video) => {
    //     return $http({
    //         method: 'POST',
    //         data: {video},
    //         url: serverUrl + '/api/upload'
    //     })
    // };
    this.uploadVid = (video) => {
        return $http({
          method: 'POST',
          data: {video},
          url: serverUrl + '/api/uploadvideo'
      })
    };
    this.userVideos = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        })
    };
    this.getAccessToken = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/accesstoken'
        })
    };
    this.addToWatchLater = (video, id) => {
        return $http({
            method: 'POST',
            data: {video},
            url: serverUrl + `/api/videos/${id}/watchlater`
        })
    };
    this.getWatchLaterList = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/usersvideos'
        })
    }
});
