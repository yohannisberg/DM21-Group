angular.module('vimeoApp').service('mainService', function ($http) {
    let serverUrl = 'http://localhost:3001'
    this.searchVideos = () => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/'
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
            method: 'POST',
            url: serverUrl + '/api/login'
        })
    }

});