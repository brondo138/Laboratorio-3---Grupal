import { questionNumber } from "../classes/readline";
import { ShoppingCart } from "../classes/shoppingCart";
import { CategoryInterface } from "../interfaces/categoryInterface";
import { UserInterface } from "../interfaces/userInterface";





export async function shoppingCartMenu(cart: ShoppingCart, categories: CategoryInterface[], user: UserInterface) {
    let condition = true;

    do {
        console.log("\nMenú del carrito de compras");
        console.log("1. Ver carrito");
        console.log("2. Eliminar producto del carrito");
        console.log("3. Finalizar compra");
        console.log("4. Vaciar carrito");
        console.log("5. Volver");

        const option = await questionNumber("Opción: ");

        switch (option) {
            case 1:
                cart.showCart();
                break;
            case 2:
                await cart.removeProduct();
                break;
            case 3:
                await cart.checkout(categories, user);
                break;
            case 4:
                cart.clearCart();
                break;
            case 5:
                condition = false;
                break;
            default:
                console.error("Error: Opción inválida.");
                break;
        }
    } while (condition);
}
