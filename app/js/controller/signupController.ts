import { LoginController } from './loginController';
import { LoginService } from '../service/loginService';
import { CommonService } from '../service/commonService';
import '../../css/signup.css';
class SignUpController extends LoginController {
    constructor(public $scope: angular.IScope, public loginService: LoginService, public commonService: CommonService, public $timeout: angular.ITimeoutService, public $http: angular.IHttpService, public $location: angular.ILocationService) {
        super($scope, loginService, commonService, $timeout, $http, $location);
        $scope.routeClass = 'page-sign';
        $scope.registerNickname = this.registerNickname ;
    }
    closePasswordEyes() {
        super.closePasswordEyes();
    }
    registerNickname<T>(nickname:T):T{
        console.log(nickname) ;
        return nickname ;
    }

}

export { SignUpController }