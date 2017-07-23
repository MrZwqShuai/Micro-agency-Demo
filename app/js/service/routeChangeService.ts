import { ViewService } from '../service/viewService';
interface CommentData {
    results: {
        content: any
    }[];
}
//初始化首页 get数据
class RouteChangeService {
    static curUrl: string = '当前路径';
    public judgeSign;
    public routeChangeStart: Function;
    public sendComment: Function;
    constructor(public $rootScope: angular.IRootScopeService, public $http: angular.IHttpService, public $timeout: angular.ITimeoutService, private $location:ng.ILocationService,private viewService: ViewService) {
        let _this = this;
        //初始化首页 get数据
        _this.routeChangeStart = function (url): any {
            return this.$http.get(url).then((response: { data }) => {
                if (response.data.state === '未登录') {
                    this.$rootScope.hassSignOut = true;
                } else if (response.data.state === '已登录') {
                    this.$rootScope.hassSignOut = false;
                    console.log('返回数据', response.data);
                    // this.renderUserData(response.data);
                }
                return response.data;
            }).catch((res) => {
                if (res) console.error(res);
            });
        }
        this.sendComment = (comment: any,cDate:object) => {
            let postId = $location.path();
            // 替换/article/
            postId = postId.replace('/articles/','') ;
            console.log('留言service入口',cDate, comment, postId);
            $http.post('/posts/comment', {
                content: comment, postId: postId,cDate:cDate
            }).then((response) => {
                console.log('留言的数据:', response.data);
            });
        }
    }

}
export { RouteChangeService };  