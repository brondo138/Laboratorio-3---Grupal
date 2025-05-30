import { BaseValidator } from "../BaseValidator";

export class PaypalValidator extends BaseValidator{
    public handle(request: any): string | null {
        const emailRegex = /^[^\@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(request.email))
            return `El email no es valido, debe incluir un @. `
        return super.handle(request)
    }
}

export class PaypalPasswordValidator extends BaseValidator {

    public handle(request: any): string | null {
        if(request.password === ``)
            return `La contraseña no puede quedar vacia.`

        if (request.password.length < 8)
            return "El contraseña no puede tener menos de 8 caracteres.";

        return super.handle(request);
    }
}