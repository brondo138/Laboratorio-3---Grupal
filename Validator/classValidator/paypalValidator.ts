import { BaseValidator } from "../BaseValidator";

export class PaypalValidator extends BaseValidator{
    public handle(request: any): string {
        if(request === ``)
            return `El metodo de pago es incorrecto `

        return super.handle(request)
    }
}