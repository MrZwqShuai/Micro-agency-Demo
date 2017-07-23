interface IGender {
    boy: string;
    girl: string;
}
class PersonalInfoService {
    public gender: IGender = {
        boy: '男',
        girl: '女'
    };
    public personal: {
        gender: string
    } = {
        gender: '男'
    };
    public nickname:string = '黑子哲也' ;
    constructor() { }
}
export {PersonalInfoService}