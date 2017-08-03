import { TourismService } from '../service/tourismService';
import { CommonService } from '../service/commonService';
import '../../css/createblog.css';
import * as angular from 'angular';
class TopController {
	static $inject: Array<string> = ['$rootScope', '$timeout', '$scope', 'tourismService', 'commonService'];
	constructor(public $rootScope: angular.IRootScopeService, public $timeout: angular.ITimeoutService, public $scope: angular.IScope, public tourismService: TourismService, public commonService: CommonService) {
		$scope.isClickS = false;
		console.log(commonService);
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
		console.log(this.$rootScope.isSigned);
		// 接受子控制器的emit
		this.$rootScope.$on('promptMsg', (e, data) => {
			console.log('广播消息', data, typeof data);
			this.$rootScope.prompt.isTrue = true;
			this.$rootScope.pIndex.i = this.commonService.pIndex = data.index;
			this.$timeout(() => {
				this.$scope.prompt.isTrue = this.commonService.prompt.isTrue = false;
			}, 1000);
		});
	}

}
export { TopController };