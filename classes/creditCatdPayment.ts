import { PaymentMethodInterface } from "../interfaces/paymentMethodInterface";
import { questionString } from "./readline";

export class CreditCardPayment implements PaymentMethodInterface {
    async processPayment(total: number): Promise<boolean> {
        const cardNumber = await questionString("Ingrese su número de tarjeta: ");
        const expiry = await questionString("Ingrese la fecha de vencimiento (MM/AA): ");
        const cvv = await questionString("Ingrese el código de seguridad (CVV): ");

        if (!cardNumber || !expiry || !cvv) {
            console.error("Error: Datos de tarjeta incompletos.");
            return false;
        }

        console.log(`Pago de $${total.toFixed(2)} procesado con tarjeta.`);
        return true;
    }
}
