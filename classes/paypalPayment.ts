import { PaymentMethodInterface } from "../interfaces/paymentMethodInterface";
import { questionString } from "./readline";

export class PayPalPayment implements PaymentMethodInterface {
    async processPayment(total: number): Promise<boolean> {
        const email = await questionString("Ingrese su correo de PayPal: ");
        const password = await questionString("Ingrese su contraseña de PayPal: ");

        if (!email || !password) {
            console.error("Error: Credenciales de PayPal incompletas.");
            return false;
        }

        console.log(`Pago de $${total.toFixed(2)} procesado con PayPal.`);
        return true;
    }
}
