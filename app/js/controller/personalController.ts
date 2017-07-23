import { MainListController } from './mainListController';
import { ViewService } from '../service/viewService';
import { TourismService } from '../service/tourismService';
import { RouteChangeService } from '../service/routeChangeService';
import { CommonService } from '../service/commonService';
import { PersonalInfoService } from '../service/personalInfoService';
import '../../css/personal.css';
import * as angular from 'angular';
class PersonalController extends MainListController {
    static $inject: Array<string> = ['$rootScope', '$timeout', '$scope', 'viewService', 'tourismService', 'routeChangeService', 'commonService', '$location', 'personalInfoService'];
    constructor(public $rootScope: angular.IRootScopeService, public $timeout: angular.ITimeoutService, public $scope: angular.IScope, public viewService: ViewService, public tourismService: TourismService, public routeChangeService: RouteChangeService, public commonService: CommonService, public $location: angular.ILocationService, public personalInfoService: PersonalInfoService) {
        super($rootScope, $timeout, $scope, viewService, tourismService, routeChangeService, commonService);
        $scope.nickname = personalInfoService.nickname;
        $scope.bio = personalInfoService.bio;
    }
    $onInit() {
        console.log('组件初始化..');
        let url = this.$location.path();
        console.log(url, '开始发送请求');
        this.showHomePage(url, (data: any) => {
            let bio = data.results[0].author.bio;
            console.log(data,bio,this.personalInfoService.bio)
            this.$scope.bio = bio;
        });
    }
    showHomePage(url?: string, callback?: (data: any) => void) {
        super.showHomePage(url, callback);
    }
}
export { PersonalController }