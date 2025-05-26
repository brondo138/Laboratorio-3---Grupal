import { CartItemInterface } from "../interfaces/cartItemInterface";
import { UserInterface } from "../interfaces/userInterface";

export function makeCheck(user: UserInterface, cart: CartItemInterface[]): void {
    console.log("\n----- FACTURA DE COMPRA -----");
    console.log(`Cliente: ${user.name}`);
    console.log(`Correo: ${user.email}`);
    console.log("Productos comprados:");

    let totalGeneral = 0;

    cart.forEach(item => {
        const base = item.price / (1 + (item.taxRate / 100));
        const impuesto = item.price - base;
        const subtotal = item.subtotal;

        console.log(`- ${item.name}`);
        console.log(`  Precio base: $${base.toFixed(2)}`);
        console.log(`  Impuesto (${item.taxRate}%): $${impuesto.toFixed(2)}`);
        console.log(`  Total unitario: $${item.price.toFixed(2)} x ${item.quantity} = $${subtotal.toFixed(2)}`);

        totalGeneral += subtotal;
    });

    console.log(`\nTotal general: $${totalGeneral.toFixed(2)}`);
    console.log("Factura enviada al correo: " + user.email);
    console.log("------------------------------\n");
} 