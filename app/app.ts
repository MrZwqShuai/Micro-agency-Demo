import * as angular from 'angular';
import 'angular-route';
import 'angular-animate';
//控制器
import { TopController } from './js/controller/TopController';
import { MainDetailController } from './js/controller/detailController';
import { MainListController } from './js/controller/mainListController';
import { LoginController } from './js/controller/loginController';
import { SignUpController } from './js/controller/signupController';
import { PublisherController } from './js/controller/publisherController';
import { PersonalController } from './js/controller/personalController';
import { HomeSettingController } from './js/controller/homeSettingController';
import { PersonalInfoController } from './js/controller/personalInfoController';
//服务
import { ViewService } from './js/service/viewService';
import { CommonService } from './js/service/CommonService';
import { TourismService } from './js/service/tourismService';
import { RouteConfig } from './js/routes/index';
import { LoginService } from './js/service/loginService';
import { RouteChangeService } from './js/service/routeChangeService';
import { PostService } from './js/service/postService';
import { PersonalInfoService } from './js/service/personalInfoService';
import { FileUploadService } from './js/service/fileUploadService' ;
//指令
import { scrollRefresh } from './js/directive/scrollDirective';
import {FileModel} from './js/directive/fileModelDirective' ;
let App = angular.module('App', ['ngRoute', 'ngAnimate']);
App.service('viewService', ViewService);
App.service('tourismService', TourismService);
App.service('loginService', LoginService);
App.service('routeChangeService', RouteChangeService);
App.service('postService', PostService);
App.service('commonService', CommonService);
App.service('personalInfoService', PersonalInfoService);
App.service('fileUploadService',FileUploadService) ;
//图片service
// App.service('fileUploadService',FileUploadService) ;
App.run(['$rootScope', '$location', '$http', 'routeChangeService', function ($rootScope: angular.IRootScopeService, $location: angular.ILocationService, $http: angular.IHttpProvider, routeChangeService: RouteChangeService) {
	$rootScope.title = "Typescript重写社区";
	$rootScope.hasSignOut = {};//是否登出

}]);
//控制器
App.controller('TopController', TopController);
App.controller('MainListController', MainListController);
App.controller('MainDetailController', MainDetailController);
App.controller('LoginController', LoginController);
App.controller('SignUpController', SignUpController);
App.controller('PublisherController', PublisherController);
App.controller('PersonalController', PersonalController);
App.controller('HomeSettingController', HomeSettingController);
App.controller('PersonalInfoController', PersonalInfoController);
//指令
App.directive('scrollRefresh', scrollRefresh);
//文件上传指令
App.directive('fileModel',FileModel.instance) ;
//配置路由	
App.config(RouteConfig);
//关闭debug 官方推荐 
App.config(function ($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
});
App.config(['$qProvider', function ($qProvider) {
	$qProvider.errorOnUnhandledRejections(false);
}]);
export { App }; 