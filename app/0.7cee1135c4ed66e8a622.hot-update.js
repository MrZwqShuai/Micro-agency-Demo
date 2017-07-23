webpackHotUpdate(0,{

/***/ 8:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, exports, __webpack_require__(1), __webpack_require__(2), __webpack_require__(5), __webpack_require__(4), __webpack_require__(3), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_RESULT__ = function (require, exports, angular, TopController_1, viewService_1, tourismService_1, detailController_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let App = angular.module('App', ['ngRoute']);
    exports.App = App;
    App.service('viewService', viewService_1.ViewService);
    App.service('tourismService', tourismService_1.TourismService);
    console.log(App);
    App.run(function ($rootScope) {
        $rootScope.title = "Typescript重写社区";
    });
    App.controller('topController', ['$scope', 'viewService', 'tourismService', TopController_1.TopController]);
    App.controller('mainDetailController', detailController_1.MainDetailController);
    //配置路由
    App.config(function ($routeProvider) {
        $routeProvider
            .when('/index', {
            templateUrl: './views/main.html'
        })
            .when('/detail/:id', {
            controller: 'mainDetailController',
            templateUrl: function ($routeParams) {
                return './views/main-detail.html';
            }
        })
            .when('/tourism', {
            templateUrl: 'app/views/tourism.html'
        })
            .when('/tourism/:id', {
            controller: 'tourismController',
            templateUrl: function () {
                return 'app/views/tourismDetails.html';
            }
        });
        $routeProvider.otherwise({
            redirectTo: '/index'
        });
    });
    //关闭debug 官方推荐
    App.config(function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    });
}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ })

})