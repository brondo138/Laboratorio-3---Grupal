import { IValidator } from "../interfaces/chainInterface";

export abstract class BaseValidator implements IValidator{
    private next :IValidator |null = null;

    public setNext(handler: IValidator): IValidator {
        this.next = handler;
        return handler
    }
    public handle(request: any): string | null{
        if (this.next)
            return this.next.handle(request)
        
        return null;
    }
}