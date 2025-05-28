import { PaymentMethodInterface } from "../interfaces/paymentMethodInterface";
import { questionString } from "./readline";

export class CreditCardPayment implements PaymentMethodInterface {
    async processPayment(total: number): Promise<boolean> {
        let cardNumber: string;
        let expiry: string;
        let cvv: string;

        do {
            cardNumber = await questionString("Ingrese su número de tarjeta: ");
            if (!/^\d{13,19}$/.test(cardNumber)) {
                console.error("Error: El número de tarjeta debe tener entre 13 y 19 dígitos.");
                continue;
            }

            if (!/^[456]/.test(cardNumber)) {
                console.error("Error: Número de tarjeta no reconocido como válido (solo Visa, MasterCard, Discover).");
                continue;
            }

            break;
        } while (true);

        do {
            expiry = await questionString("Ingrese la fecha de vencimiento (MM/AA): ");
            const match = expiry.match(/^(\d{2})\/(\d{2})$/);

            if (!match) {
                console.error("Error: Formato inválido. Use MM/AA.");
                continue;
            }

            const month = parseInt(match[1]);
            const year = parseInt("20" + match[2]);

            if (month < 1 || month > 12) {
                console.error("Error: El mes debe estar entre 01 y 12.");
                continue;
            }

            const currentDate = new Date();
            const cardDate = new Date(year, month);

            if (cardDate < currentDate) {
                console.error("Error: La tarjeta ya ha expirado.");
                continue;
            }

            break;
        } while (true);


        do {
            cvv = await questionString("Ingrese el código de seguridad (CVV): ");
            if (!/^\d{3,4}$/.test(cvv)) {
                console.error("Error: El CVV debe tener 3 o 4 dígitos numéricos.");
                continue;
            }
            break;
        } while (true);

        console.log(`Pago de $${total.toFixed(2)} procesado con tarjeta.`);
        return true;
    }
}

