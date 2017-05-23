'use strict';

angular.module('vimeoApp', ["ui.router"]).config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'views/home.html',
        controller: 'mainCtrl'
    });
}]);
'use strict';

angular.module('vimeoApp').controller('mainCtrl', ["$scope", function ($scope) {}]);
'use strict';

angular.module('vimeoApp').directive('footerDir', function () {

    return {
        restrict: "AE",
        templateUrl: "../../views/footerDir.html"
    };
});
'use strict';

angular.module('vimeoApp').directive('navBar', function () {

  return {
    restrict: 'E',
    templateUrl: './views/navBar.html',
    link: function link(scope) {}
  };
});
//# sourceMappingURL=bundle.js.map
