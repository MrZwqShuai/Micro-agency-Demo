import { IDetailC } from "../interfaces/public";
import { RouteChangeService } from '../service/routeChangeService';
import { ViewService } from '../service/viewService';
interface RouteChangeServices extends ng.IScope {

}
interface IResponse {
    author: string;
    content: string;
    currentArticle: {
        photoSrc:string
    };
    comments: Array<object>;
}
class MainDetailController implements IDetailC {
    static $inject: Array<string> = ['$scope', '$routeParams', '$location', 'routeChangeService', 'viewService'];
    commentArr: string[] = [];
    viewDetail: object = {
        id: this.$routeParams.id
    };
    private _routeChangeService: RouteChangeService;
    private _$scope: ng.IScope;
    constructor(private $scope: angular.IScope, private $routeParams: angular.route.IRouteParamsService, private $location: angular.ILocationService, public routeChangeService: RouteChangeService, private viewService: ViewService) {
        $scope.routeClass = "list-detail";
        this.$scope.commentArr = [];
        this.$scope.viewDetail = this.viewDetail;
        this.$scope.listViews = viewService.listViews;
        this._routeChangeService = routeChangeService;
        console.log(1, this._routeChangeService);
        this._$scope = $scope;
        this.$scope.sendComment = (comment: any) => {
            console.log(this);
            let promise = this._routeChangeService.routeChangeStart('/articles');
            let cDate = new Date();
            promise.then((data) => {
                console.log(2228, data);
                if (data.state === "未登录") {
                    alert('请先登录');
                    $location.url('/signin');
                    return;
                }
                this._routeChangeService.sendComment(comment, cDate);
                this.$scope.commentArr.push({ content: comment, cDate: cDate });//为了匹配数据绑定遍历commentArr.content
            });

        }
    }
    $onInit() {
        //组件初始化
        this.getOneArticle().then((response: IResponse) => {
            console.log(999, response, response.currentArticle.photoSrc);
            this.$scope.mainArticle = {
                content: response.content,
                photoSrc: response.currentArticle.photoSrc
            };
            this.$scope.commentArr = response.comments;
        });
    }
    //返回单篇内容数据的promise
    getOneArticle() {
        let url = this.$location.path();
        console.log(222, url);
        return this.routeChangeService.routeChangeStart(url);
    }


}
export { MainDetailController }

