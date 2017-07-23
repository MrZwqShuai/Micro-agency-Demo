interface IDetailC{
    commentArr: string[] ;
    viewDetail: object ;
    
}
interface IRoute {
    isDefault?: boolean ;
    when?: string ;
    controller?: string ;
    template?: string ;
    templateUrl?: string ;
}
export {IRoute,IDetailC} 