import { TourismService } from '../service/tourismService';
import { CommonService } from '../service/commonService';
import '../../css/createblog.css';
import * as angular from 'angular';
class TopController {
	static $inject: Array<string> = ['$rootScope', '$timeout', '$scope', 'tourismService', 'commonService'];
	constructor(public $rootScope: angular.IRootScopeService, public $timeout: angular.ITimeoutService, public $scope: angular.IScope, public tourismService: TourismService, public commonService: CommonService) {
		$scope.isClickS = false;
		$scope.listHref = commonService.listHref;
		$scope.spread = function (): void {
			$scope.isClickS = true;
		};
		$rootScope.prompt = {
			isTrue: commonService.prompt.isTrue,
			message: commonService.prompt.message
		};
		$rootScope.pIndex = {
			i: commonService.pIndex
		};
		$scope.closeNav = function (): void {
			$scope.isClickS = false;
		};
	}
	$onInit() {
		// alert(222) ;
		console.log(this.$rootScope.isSigned) ;
	}

}
export { TopController };