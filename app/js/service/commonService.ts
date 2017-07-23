
//提示框
interface Prompt {
    isTrue: boolean;
    message: Array<string>;
}
interface ListHref {
	txt: string;
	href: string;
}
class CommonService {
    static $inject: Array<string> = ['$location', '$timeout'];
    public pIndex: number = -1;
    public prompt: Prompt = this.prompt = {
        isTrue: false,
        message: ['注册成功', '登录成功', '登录失败', '登出成功', '已经没有更多内容了!']
    };
    public subCallbackState: ($scope) => void;
    public routeHome: () => void;
    public listHref: ListHref[] = [{
		txt: "个人主页",
		href: '/#!/'
	},
	{
		txt: "发表微社",
		href: '/#!/myblog'
	},
	{
		txt: "微社热聊",
		href: '/#!/register.html'
	}, {
		txt: "设置中心",
		href: '/#!/home/setting'
	}];
    constructor(private $location: ng.ILocationService, private $timeout: ng.ITimeoutService) {
        //提示初始
        //通用回调函数展现提示框
        // 抽离提示框子scope方法 这里只有把控制器的scope传进来才能找到父控制器的scope
        this.subCallbackState = ($scope): void => {
            $scope.prompt.isTrue = this.prompt.isTrue = true;
            $scope.pIndex.i = this.pIndex = 1;
            console.log(2, $location, this.prompt.isTrue);
            this.routeHome();
            $timeout(() => {
                $scope.prompt.isTrue = this.prompt.isTrue = false;
            }, 1000);
        };
        this.routeHome = () => {
            $location.url('/');
        }
    }
}
export { CommonService }