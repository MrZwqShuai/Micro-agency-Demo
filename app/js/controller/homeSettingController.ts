import '../../css/setting.css';
import { MainListController } from './mainListController';
import { ViewService } from '../service/viewService';
interface IUserInfo {
    data: {
        userInfo: {
            username: string
        }
    }
};
class HomeSettingController {
    constructor(private $scope: ng.IScope, private $http: ng.IHttpService, private viewService: ViewService) {
    }
    //通过session获取用户信息
    getUserInfo() {
        this.$http.get('/user').then((response: IUserInfo) => {
            console.log('结果是', response.data);
            this.$scope.zwq = response.data.userInfo.username;
        })
    }
    $onInit() {
        console.log('开始请求了');
        this.getUserInfo();
    }
}
export { HomeSettingController }