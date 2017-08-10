import { ViewService } from '../service/viewService';
import { TourismService } from '../service/tourismService';
import { RouteChangeService } from '../service/routeChangeService';
import { CommonService } from '../service/commonService';
import { TopController } from './TopController';
interface Date {
    state: string;
    results: Array<object>;
    isEmptyArticle: boolean;
}
interface ArticleInfo {
    _id: string;
    author: {
        _id?:any
    }
}
class MainListController extends TopController {
    static $inject: Array<string> = ['$rootScope', '$timeout', '$http', '$scope', 'viewService', 'tourismService', 'routeChangeService', 'commonService'];
    public articleInfo: ArticleInfo;
    constructor(public $rootScope: angular.IRootScopeService, public $timeout: angular.ITimeoutService, public $http: angular.IHttpService, public $scope: angular.IScope, public viewService: ViewService, public tourismService: TourismService, public routeChangeService: RouteChangeService, public commonService: CommonService) {
        super($rootScope, $timeout, $scope, tourismService, commonService);
        $scope.routeClass = 'page-main';
        // 给scrollDirective指令用查询文章是否加载完毕
        $scope.showHomePage = (url?: string, callback?: (data: any) => void) => {
            this.showHomePage(url, callback);
        }
        $scope.animateWarning = () => {
            this.animateWarning();
        };
        //发送ajax请求数据 仅仅是发送
        $scope.getHomePage = (url?: string) => {
            return this.getHomePage(url);
        };
        // 编辑文章 收藏文章
        $scope.editArticle = (articleInfo) => {
            return this.editArticle(articleInfo);
        };
        $scope.getCancel = () => {
            return this.getCancel();
        };
        $scope.starArticle = () => {
            return this.starArticle();
        };
        // 编辑文章 收藏文章
        $scope.editArticle = (listview) => {
            return this.editArticle(listview);
        };
        // 删除某一篇文章
        $scope.deleteArticle = () => {
            console.log(this.articleInfo);
            let uid = this.articleInfo.author._id,
                aid = this.articleInfo._id;
            this.getCancel();
            $http.delete(`articles/uid=${uid}&aid=${aid}`)
                .then((response:{data:any}) => {
                    console.log(response.data.data);
                    $scope.$emit('promptMsg',response.data.data)
                });
        }

    }
    $onInit() {
        this.showHomePage('/articles');
        console.log('组件初始化..');
    }
    //处理获取home数据
    showHomePage(url?: string, judgeArticleEmpty?: (data: any) => void): void {
        console.log('获取数据...');
        this.getHomePage(url).then((data: Date) => {
            this.$scope.listViews = this.viewService.listViews.concat(data.results);
            console.log(3, data, this.$scope.listViews);
            this.showSignInOut(data);
		    this.$rootScope.successLodaing = true ;
            //处理滚动时候是否已经加载完毕
            console.log('滚动');
            judgeArticleEmpty(data);
            //返回数据条目的信息 
        });
    }
    //返回数据的promise
    getHomePage(url: string, judgeArticleEmpty?: Function) {
        return this.routeChangeService.routeChangeStart(url);
    }
    showSignInOut(data) {
        if (data.state === '未登录') {
            this.$rootScope.isSigned = {
                txt: '登录',
                href: '/#!/signin'
            };
        } else if (data.state === '已登录') {
            this.$rootScope.isSigned = {
                txt: '退出登录',
                href: '/signout'
            };
        }
    }
    // // 首屏加载
	// perloading() {
	// 	this.$rootScope.successLodaing = true ;
	// }
    //路由切换清除window的全局事件
    routerLeave(): void {
        // this.$scope.$on('$routeChangeSuccess', (event) => {
        //     alert('切换成功');
        //     window.onscroll = null ;
        // });
    }
    // 提示框定时消失
    animateWarning(): void {
        this.$timeout(() => {
            this.$rootScope.prompt.isTrue = false;
        }, 1000);
    }
    //文章内容的编辑与收藏
    editArticle(articleInfo) {
        console.log(articleInfo, 2);
        this.$scope.edit = {
            touched: true
        };
        this.articleInfo = articleInfo;
    }
    getCancel() {
        this.$scope.edit = {
            touched: false
        };
    }
    starArticle() {
        alert('已收藏');
    }

}
export { MainListController }