export interface IValidator{
    setNext(handler:IValidator):IValidator;
    handle(request:any):string | null ;
}