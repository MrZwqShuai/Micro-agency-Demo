class FileModel implements ng.IDirective {
    static $inject: Array<string> = ['$parse'];
    constructor(private $parse: ng.IParseService) { }
    static instance($parse): ng.IDirective {
        return new FileModel($parse);
    }
    restrict: string = 'A';
    link: (scope, element, attrs) => void = (scope, element, attrs) => {
        let model = this.$parse(attrs.fileModel);
        let modelSetter = model.assign;
        element.bind('change', () => {
            scope.$apply(() => {
                modelSetter(scope, element[0].files[0]);
            });
            // scope.getFile( element[0].files[0]);
        });
    };
}
export { FileModel }