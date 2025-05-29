import { IValidator } from "./chainInterface";

export abstract class BaseValidator implements IValidator{
    private next :IValidator |null = null;

    public setnext(handler: IValidator): IValidator {
        this.next = handler;
        return handler
    }
    public handle(request: any): string {
        return this.next ? this.next.handle(request): `dato valido`
    }
}