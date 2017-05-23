angular.module('vimeoApp').service('mainService', function ($http) {
    let serverUrl = 'http://localhost:3001'
    this.getVideoById = (id) => {
        return $http({
            method: 'GET',
            url: serverUrl + '/api/videos/' + id
        })
    }
});