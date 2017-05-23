'use strict';

angular.module('vimeoApp', []);
'use strict';

angular.module('vimeoApp').controller('mainCtrl', ["$scope", function ($scope) {
  console.log('test');
}]);
"use strict";
'use strict';

angular.module('vimeoApp').directive('navBar', function () {

  return {
    restrict: 'E',
    templateUrl: './views/navBar.html',
    link: function link(scope) {
      scope.showDropdown = function () {};
    }
  };
});
"use strict";
//# sourceMappingURL=bundle.js.map
