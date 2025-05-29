export interface IValidator{
    setnext(handler:IValidator):IValidator;
    handle(request:any):string;
}