// interface MoblieRegex {
//     moblieRegexs: object;
// }
interface PhoneNumber {
    length: number;
}
// interface ReplaceObj {
//     replace(reg: RegExp, replacement: string): string;
// }
interface PwdWarning {
    txt: string;
}
class LoginService {
    // public moblieRegex: MoblieRegex;
    public correctPhoneNum: boolean = true;
    public inPhoneNum: boolean;
    public legitimatePhone: boolean;
    public login: {
        validPassword: string
    };
    public isCorrectPwd: boolean;
    public pwdWarning: PwdWarning = {
        txt: '密码不能为空'
    };
    constructor(private $timeout: angular.ITimeoutService, private $location: angular.ILocationService) {
    }
    isPhoneNumber(phone: any): boolean {
        let reg = /^1[34578]\d{9}$/;
        return reg.test(phone);
    }
    ifChineseCharacters(txt: any): boolean {
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        return reg.test(txt);
    }
    judgePhoneNum(phone: PhoneNumber) {
        this.legitimatePhone = this.isPhoneNumber(phone);
        this.inPhoneNum = true;
        this.correctPhoneNum = true;
        if (this.legitimatePhone) {
            this.correctPhoneNum = true;
        } else if (phone.length > 11) {
            this.correctPhoneNum = false;
            this.inPhoneNum = false;
        }
    }
    isCorrectPhoneNum(phone: number | string) {
        if (this.legitimatePhone) {
            this.inPhoneNum = false;
        } else {
            this.correctPhoneNum = false;
            this.inPhoneNum = false;
        }
    }
    correctPassword(password: any) {
        this.isCorrectPwd = false;
        let reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
        var pwd = password.replace(reg, '');
        this.login.validPassword = pwd;
        if (reg.test(password)) {
            this.pwdWarning.txt = '不能输入汉字';
            this.isCorrectPwd = true;
        }
        console.log(this, this.pwdWarning.txt);
    }
    emptyPassworld(password: string) {
        if (!password) {
            this.isCorrectPwd = true;
            this.pwdWarning.txt = '密码不能为空';
        }
    }
    register($scope, $http, username: number, password: any, nickname: any, bio: string | number, callbackState: (state: any) => void) {
        //注册fn
        let isCorrectUser = this.isPhoneNumber(username);
        let avatar = $scope.myAvatar;
        let formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('nickname', nickname);
        formData.append('bio', bio);
        formData.append('avatar', avatar);
        console.log('注册发送url', isCorrectUser, bio, formData.get('bio'));
        if (isCorrectUser) {
            $http.post("/signup", formData, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            }).then((response) => {
                console.log('注册返回的数据' + response.data.state);
                let responseState = response.data.state;
                if (responseState === '注册成功') {
                    callbackState(responseState);
                }
            });
        }
    }
    signin($http, username: number, pwd: any, callbackState: (state: any) => void) {
        //登录fn
        let isCorrectUser = this.isPhoneNumber(username);
        console.log('登录发送url', isCorrectUser);
        if (isCorrectUser) {
            $http.post("/signin", { username: username, password: pwd }).then((response) => {
                let responseState = response.data.state;
                console.log(responseState === '登录成功');
                if (responseState === '登录成功') {
                    console.log(333, this);
                    callbackState(responseState);
                }
            });
        }
    }
}

export { LoginService };