"use strict";angular.module("vimeoApp",["ui.router"]).config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/"),e.state("home",{url:"/",templateUrl:"views/home.html",controller:"mainCtrl"})}]),angular.module("vimeoApp").controller("mainCtrl",["$scope",function(e){}]),angular.module("vimeoApp").service("mainService",["$http",function(e){this.getVideoById=function(t){return e({method:"GET",url:"http://localhost:3001/api/videos/"+t})}}]),angular.module("vimeoApp").directive("footerDir",function(){return{restrict:"AE",templateUrl:"../../views/footerDir.html"}}),angular.module("vimeoApp").directive("navBar",function(){return{restrict:"E",templateUrl:"./views/navBar.html",link:function(e){}}});
//# sourceMappingURL=bundle.js.map
