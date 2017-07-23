import { IRoute } from '../interfaces/public';
import { MainDetailController } from '../controller/detailController';

export function RouteConfig($locationProvider: angular.ILocationProvider, $routeProvider: angular.route.IRouteProvider) {
    const routes: IRoute[] = [{
        controller: 'TopController',
        templateUrl: 'views/main-list.html'
    },
    {
        controller: 'MainDetailController',
        templateUrl: 'views/main-detail.html'
    },{
        controller: 'LoginController',
        templateUrl:'views/loginPage.html'
    },{
        controller: 'SignUpController',
        templateUrl:'views/signup.html'
    },{
        controller:'LoginController',
        templateUrl:'views/create.html'
    },{
        controller:'PersonalController',
        templateUrl:'views/personal-center.html'
    },
    {
        controller:'HomeSettingController',
        templateUrl:'views/home-setting.html'
    },
    {
        controller:'PersonalInfoController',
        templateUrl:'views/personal-information.html'
    }];
    const urls: string[] = ['/', '/articles/:posId','/signin','/register.html','/myblog','/user/:uid','/home/setting','/user/:uid/edit'];


    routes.forEach((ro, index) => {
        $routeProvider.when(urls[index], ro);
        $routeProvider.otherwise({
            redirectTo: '/'
        });
    });
}