import { BaseValidator } from "../BaseValidator";

export class CreditCardValidator extends BaseValidator{
    public handle(request: any): string|null {
        if(request === (!/^\d{13,19}$/.test(request)))
            return `El numero de tarjeta debe tener entre 13 y 19 digitos`

        return super.handle(request)
    }
}

export class CreditCardTypeValidator extends BaseValidator {
    public handle(request: any): string|null{
        if (!/^[456]/.test(request)) 
            return "Número de tarjeta no reconocido como válido (solo Visa, MasterCard, Discover).";
        
        return super.handle(request);
    }
}
export class ExpiryFormatValidator extends BaseValidator {
    public handle(request: any): string|null{
        let match = request.match(/^(\d{2})\/(\d{2})$/);
        if (!match) {
            return "Formato invalido. Use MM/AA.";
        }
        return super.handle(request);
    }
}

export class ExpiryDateValidator extends BaseValidator {
    public handle(request: any): string | null{
        const match = request.match(/^(\d{2})\/(\d{2})$/);
        
        const month = parseInt(match[1]);
        const year = parseInt("20" + match[2]);

        if (month < 1 || month > 12) {
            return "El mes debe estar entre 01 y 12.";
        }

        const currentDate = new Date();
        const cardDate = new Date(year, month, 1);

        if (cardDate < currentDate) {
            return "La tarjeta ya ha expirado.";
        }

        return super.handle(request);
    }
}
export class CVVFormatValidator extends BaseValidator {
    public handle(request: any): string|null{
        if (!/^\d{3,4}$/.test(request)) {
            return "El CVV debe tener 3 o 4 dígitos numéricos.";
        }
        return super.handle(request);
    }
}


