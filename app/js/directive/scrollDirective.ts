// import { MainListController } from '../controller/mainListController';
import { CommonService } from '../service/commonService';
export const scrollRefresh: angular.IDirectiveFactory = function (): angular.IDirective {
    return {
        restrict: 'A',
        // require: 'MainListController',
        link: function ($scope, element: angular.IAugmentedJQuery, attrs) {
            console.log(element);
            //判断滚动条到底部
            function getScrollTop():number {
                var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
                if (document.body) {
                    bodyScrollTop = document.body.scrollTop;
                }
                if (document.documentElement) {
                    documentScrollTop = document.documentElement.scrollTop;
                }
                scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
                return scrollTop;
            }
            //文档的总高度
            function getScrollHeight():number {
                var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
                if (document.body) {
                    bodyScrollHeight = document.body.scrollHeight;
                }
                if (document.documentElement) {
                    documentScrollHeight = document.documentElement.scrollHeight;
                }
                scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
                return scrollHeight;
            }
            //浏览器视口的高度
            function getWindowHeight():number {
                var windowHeight = 0;
                if (document.compatMode == "CSS1Compat") {
                    windowHeight = document.documentElement.clientHeight;
                } else {
                    windowHeight = document.body.clientHeight;
                }
                return windowHeight;
            }
            if (element) {
                window.onscroll = function ():void {
                    if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
                        function judgeArticleEmpty(data): void {
                            if (data.isEmptyArticle) {
                                $scope.prompt.isTrue = true;
                                $scope.pIndex.i = 4;
                                $scope.animateWarning();
                                console.log('内容全部加载完毕清空windowscroll函数了');
                                window.onscroll = null;
                            }
                        $scope.$emit('loadingBlock',false) ;
                        }
                        $scope.$emit('loadingBlock',true) ;
                        $scope.showHomePage('/articles',judgeArticleEmpty);
                    }
                };
            }
        }
    }
}