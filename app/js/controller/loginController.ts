import { LoginService } from '../service/loginService';
import { CommonService } from '../service/commonService';
import '../../css/login.css';
class LoginController {
    static $inject: Array<string> = ['$scope', 'loginService', 'commonService', '$timeout', '$http', '$location'];
    public Nationalcities: object[] = [
        {
            id: '3',
            name: '美国/加拿大'
        },
        {
            id: '5',
            name: '台湾'
        }, {
            id: '13',
            name: '中国大陆'
        }, {
            id: '23',
            name: '英国'
        }, {
            id: '31',
            name: '泰国'
        }, {
            id: '50',
            name: '俄罗斯'
        }, {
            id: '58',
            name: '巴基斯坦'
        }
    ];
    public nationalcity: string;
    public isShowPassword: boolean = false;
    public login: {
        password: string
    } = {
        password: 'text'
    };
    private isCorrectPwd;
    public callbackState: (state) => void;
    constructor(public $scope: angular.IScope, public loginService: LoginService, public commonService: CommonService, public $timeout: angular.ITimeoutService, public $http: angular.IHttpService, public $location: angular.ILocationService) {
        this.$scope.loginStatu = '登录';
        this.$scope.routeClass = 'page-login'// 路由动画pageClass
        this.$scope.Nationalcities = this.Nationalcities;
        this.$scope.select = {
            defCity: this.Nationalcities[2]
        };
        this.$scope.goBack = this.goBack;
        this.$scope.isShowPassword = this.isShowPassword;//密码眼睛的图片切换
        this.$scope.closePasswordEyes = this.closePasswordEyes;//显示与隐藏密码
        this.$scope.login = this.login;
        this.$scope.login.password = this.login.password;
        $scope.isPhoneNumber = loginService.isPhoneNumber;
        $scope.judgePhoneNum = loginService.judgePhoneNum;
        this.$scope.correctPhoneNum = loginService.correctPhoneNum;
        this.$scope.inPhoneNum = loginService.inPhoneNum;
        this.$scope.isCorrectPhoneNum = loginService.isCorrectPhoneNum;
        this.$scope.ifChineseCharacters = loginService.ifChineseCharacters;
        this.$scope.correctPassword = loginService.correctPassword;
        this.$scope.isCorrectPwd = this.isCorrectPwd;
        this.$scope.emptyPassworld = loginService.emptyPassworld;
        this.$scope.isCorrectPwd = loginService.isCorrectPwd;
        this.$scope.pwdWarning = {
            txt: loginService.pwdWarning.txt
        }
        //测试登录获取数据
        // 回调函数改变顶部提示框
        this.callbackState = (state) => {
            alert('回调');
            commonService.subCallbackState($scope);
        }
        this.$scope.register = loginService.register;
        this.$scope.signin = loginService.signin;
        $scope.registerFN = (username: number, pwd: string,nickname) => {
            $scope.register($scope,$http, username, pwd,nickname, this.callbackState);
        }
        $scope.signinFn = (username: number, pwd: string) => {
            $scope.signin($http, username, pwd, this.callbackState);
        }
    }
    goBack() {
        history.back();
    }
    // 密码不可见
    closePasswordEyes() {
        this.isShowPassword = this.isShowPassword ? false : true;
        if (this.isShowPassword) {
            this.login.password = 'password';
        } else {
            this.login.password = 'text';
        }
    }

}

export { LoginController }