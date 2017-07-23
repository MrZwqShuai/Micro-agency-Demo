import { ViewService } from '../service/viewService';
import { PostService } from '../service/postService';
import { FileUploadService } from '../service/fileUploadService';
import '../../css/createblog.css';
class PublisherController {
	static $inject: Array<string> = ['$scope', '$http', '$location', 'viewService', 'postService', 'fileUploadService'];
	public disable: boolean = true;
	constructor(private $scope: ng.IScope, private $http: angular.IHttpService, private $location: ng.ILocationService, private viewService: ViewService, private postService: PostService, private fileUploadService: FileUploadService) {
		$scope.disable = this.disable;
		$scope.publisher = {
			pushTxt: ''
		};
		$scope.pushing = this.pushing;
		$scope.publishArticle = (article) => {
			this.publishArticle(article);
		}
		$scope.selectPhoto = this.selectPhoto;
	}
	pushing(pushTxt: any) {
		if (pushTxt) {
			this.disable = false;
		} else {
			this.disable = true;
		}
		console.log(pushTxt.length);
	}
	//发表文章
	publishArticle(article: any): void {
		let formData = this.uploadFile(article);
		let articleData = this.postService.publishArticleData(formData);
		articleData.then((response: { data: any }) => {
			let postId = response.data._id;
			let photoSrc = response.data.photoSrc ;
			console.log(2,photoSrc) ;
			this.viewService.listViews.unshift({
				photoSrc: photoSrc,
				content: article,
				postId: postId
			});
			this.$location.url('/');
			console.log('------', response.data);
		}).catch((error) => {
			console.error(error);
		});
	}
	// 发送图片到后台
	uploadFile(article: any) {
		let file = this.$scope.myFile;
		let uploadUrl = '/file';
		console.dir(file, uploadUrl);
		console.log('file is', uploadUrl);
		return this.fileUploadService.uploadFileToUrl(uploadUrl, file, article);

	}
	selectPhoto() {
		console.log('选择你想上传的照片');
	}
}

export { PublisherController } 