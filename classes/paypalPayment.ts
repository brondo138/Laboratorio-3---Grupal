import { PaymentMethodInterface } from "../interfaces/paymentMethodInterface";
import { PaypalPasswordValidator, PaypalValidator } from "../Validator/classValidator/paypalValidator";
import { questionString } from "./readline";

export class PayPalPayment implements PaymentMethodInterface {
    async processPayment(total: number): Promise<boolean> {
        do {
        const payPalChain = new PaypalValidator() //cadena
        payPalChain.setNext(new PaypalPasswordValidator())
        const email = await questionString("Ingrese su correo de PayPal: ");
        const password = await questionString("Ingrese su contraseña de PayPal: ");

        
            
            const error = payPalChain.handle({email: email, password:password});
            if (error) {
                console.error("Error:", error);
                continue;
            }
            break;
        } while (true);

        console.log(`Pago de $${total.toFixed(2)} procesado con PayPal.`);
        return true;
    }
}
