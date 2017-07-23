class PostService {
	static $inject:Array<string> = ['$http'] ;
    constructor(private $http: ng.IHttpService) {
    }
    publishArticleData(formData: any) {
        return this.$http.post('/posts/create', formData,{
            transformRequest:angular.identity,
            headers: {'Content-Type':undefined}
        })
    }
}
export { PostService }