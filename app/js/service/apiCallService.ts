class APICALLSERVICE {
    constructor(private $http: angular.IHttpService) {
    }
    getCallAPI(url?:string) {
        let promise = this.$http.get(url) ;
        return promise ;
    }
    deleteCallAPI(url?:string) {
        let promise = this.$http.delete(url) ;
        return promise ;
    }
}

export { APICALLSERVICE }