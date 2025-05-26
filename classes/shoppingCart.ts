import { ProductInterface } from "../interfaces/productInterface";
import { UserInterface } from "../interfaces/userInterface";
import { CategoryInterface } from "../interfaces/categoryInterface";
import { questionNumber } from "../classes/readline";
import { CartItemInterface } from "../interfaces/cartItemInterface";
import { PaymentMethodInterface } from "../interfaces/paymentMethodInterface";
import { CreditCardPayment } from "./creditCatdPayment";
import { order } from "./orders";
import { PayPalPayment } from "./paypalPayment";
import { ShoppingCartInterface } from "../interfaces/shoppingCartInterface";
import { makeCheck } from "../functions/makeCheck";

export class ShoppingCart implements ShoppingCartInterface{
    private items: CartItemInterface[] = [];
    private stockChanges: Map<string, { product: ProductInterface, cantidad: number }> = new Map();

    constructor(private user: UserInterface) {}

    addProduct(product: ProductInterface): void {
        const finalPrice = "getPrecioConDescuento" in product
            ? (product as any).getPrecioConDescuento()
            : product.price;

        if (product.stock <= 0) {
            console.error(`Error: No hay suficiente stock de "${product.name}"`);
            return;
        }

        const existing = this.items.find(item => item.productId === product.id);

        if (existing) {
            existing.quantity++;
            existing.subtotal = existing.quantity * finalPrice;
        } else {
            this.items.push({
                productId: product.id,
                name: product.name,
                price: finalPrice,
                quantity: 1,
                subtotal: finalPrice,
                taxRate: product.taxRate // ✅ importante para la factura
            });
        }

        product.stock--;

        if (this.stockChanges.has(product.id)) {
            const reg = this.stockChanges.get(product.id)!;
            reg.cantidad++;
        } else {
            this.stockChanges.set(product.id, { product, cantidad: 1 });
        }

        console.log(`Producto "${product.name}" añadido al carrito.`);
    }

    async removeProduct(): Promise<void> {
        if (this.items.length === 0) {
            console.log("El carrito está vacío.");
            return;
        }

        this.showCart();
        const option = await questionNumber("Ingrese el número del producto a eliminar: ");

        if (isNaN(option) || option < 1 || option > this.items.length) {
            console.error("Error: Opción inválida.");
            return;
        }

        const removed = this.items.splice(option - 1, 1)[0];

        // Restaurar stock al eliminar la compra
        const change = this.stockChanges.get(removed.productId);
        if (change) {
            change.product.stock += removed.quantity;
            this.stockChanges.delete(removed.productId);
        }

        console.log(`Producto "${removed.name}" eliminado del carrito.`);
    }

    showCart(): void {
        if (this.items.length === 0) {
            console.log("Tu carrito está vacío.");
            return;
        }

        console.log(`\nCarrito de ${this.user.name}`);
        let total = 0;

        this.items.forEach((item, index) => {
            const descuentoAplicado = item.price < item.subtotal / item.quantity;
            console.log(`${index + 1}. ${item.name} - $${item.price.toFixed(2)} x ${item.quantity} = $${item.subtotal.toFixed(2)}${descuentoAplicado ? " (con descuento)" : ""}`);
            total += item.subtotal;
        });

        console.log(`Total a pagar: $${total.toFixed(2)}\n`);
    }

    clearCart(): void {
        this.stockChanges.forEach(({ product, cantidad }) => {
            product.stock += cantidad;
        });

        this.stockChanges.clear();
        this.items = [];

        console.log("Carrito vaciado y stock restaurado.");
    }



    async checkout(categories: CategoryInterface[], user: UserInterface): Promise<void> {
        if (this.items.length === 0) {
            console.error("Error: El carrito está vacío, no se puede procesar la compra.");
            return;
        }
    
        // Calcular total
        let total = 0;
        this.items.forEach(item => {
            total += item.subtotal;
        });
    
        // Mostrar carrito
        this.showCart();
    
        // Selección de método de pago
        console.log("Seleccione el método de pago:");
        console.log("1. Tarjeta de crédito/débito");
        console.log("2. PayPal");
    
        const opcion = await questionNumber("Opción: ");
        let paymentMethod: PaymentMethodInterface;
    
        switch (opcion) {
            case 1:
                paymentMethod = new CreditCardPayment();
                break;
            case 2:
                paymentMethod = new PayPalPayment();
                break;
            default:
                console.error("Error: Método de pago inválido.");
                return;
        }
    
        const pagoExitoso = await paymentMethod.processPayment(total);
    
        if (pagoExitoso) {
            await order.create(user);
            makeCheck(user, this.items); // 🧾 Genera y muestra factura
    
            this.stockChanges.clear(); // Confirmar cambios
            this.items = [];
            console.log("Compra finalizada con éxito.");
        } else {
            console.log("El pago fue cancelado o falló.");
            this.clearCart(); // Revertir
        }
    }
    

}
