import { PaymentMethodInterface } from "../interfaces/paymentMethodInterface";
import { questionString } from "./readline";
import { CreditCardValidator, CreditCardTypeValidator, ExpiryDateValidator, ExpiryFormatValidator, CVVFormatValidator } from "../Validator/classValidator/creditCardValidator";

export class CreditCardPayment implements PaymentMethodInterface {
    async processPayment(total: number): Promise<boolean> {
        let cardNumber: string;
        let expiry: string;
        let cvv: string;

        
        const creditCartChain = new CreditCardValidator()
        creditCartChain.setNext(new CreditCardTypeValidator())

        do {
            cardNumber = await questionString("Ingrese su numero de tarjeta: ");
            const error = creditCartChain.handle(cardNumber);
            if (error) {
                console.error("Error:", error);
                continue;
            }
            break;
        } while (true);

        
        const expiryChain = new ExpiryFormatValidator()
        expiryChain.setNext(new ExpiryDateValidator)

        do {
            expiry = await questionString("Ingrese la fecha de vencimiento (MM/AA): ");
            const error = expiryChain.handle(expiry);
            if (error) {
                console.error("Error:", error);
                continue;
            }

            break;
        } while (true);

        
        const cvvChain = new CVVFormatValidator()
        do {
            cvv = await questionString("Ingrese el código de seguridad (CVV): ");
            const error = cvvChain.handle(cvv);
            if (error) {
                console.error("Error:", error);
                continue;
            }
            break;
        } while (true);

        console.log(`Pago de $${total.toFixed(2)} procesado con tarjeta.`);
        return true;
    }
}

