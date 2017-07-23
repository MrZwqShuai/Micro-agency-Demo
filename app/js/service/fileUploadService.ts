class FileUploadService {
    static $inject: Array<string> = ["$http"];
    public uploadFileToUrl: (uploadUrl: any, file: any,pushTxt:string | Blob) => void;
    constructor(private $http: ng.IHttpService) {
        this.uploadFileToUrl = (uploadUrl, file,pushTxt) => {
            let formData = new FormData();
            formData.append('file', file);
            formData.append('pushTxt', pushTxt);
            console.log(formData.get('file'));
            return formData ;
        };
    }

}
export { FileUploadService }