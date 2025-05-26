import { categories } from "../classes/categories";
import { order } from "../classes/orders";
import { questionNumber, questionString } from "../classes/readline";
import { ShoppingCart } from "../classes/shoppingCart";
import { users } from "../classes/users";
import { showUserOrders } from "../functions/showUserOrders";
import { UserInterface } from "../interfaces/userInterface";
import { shoppingCartMenu } from "./shoppingCartMenu";
import { userCategoryMenu } from "./userCategoryMenu";
import { userProductMenu } from "./userProductMenu";


export async function userMenu(user: UserInterface) {
    let condition = true;
    const cart = new ShoppingCart(user); 

    do {
        const existe = users.users.find(u => u.id === user.id);

        if (!existe) {
            console.log("Tu cuenta ha sido eliminada. Cerrando sesión...\n");
            condition = false;
            break;
        }

        console.log(`\nBienvenido usuario ${user.name}`);
        console.log("1. Comprar");
        console.log("2. Carrito de compra");
        console.log("3. Mis pedidos");
        console.log("4. Ajuste de la cuenta");
        console.log("5. Cerrar sesión");
        const option = await questionNumber("Opción: ");

        switch (option) {
            case 1:
                const category = await userCategoryMenu();
            
                if (category && typeof category === "object") {
                    const product = await userProductMenu(category);
            
                    if (product && typeof product === "object") {
                        product.showInfo();
            
                        const confirm = await questionString("¿Deseas añadir este producto al carrito? (s/n): ");
            
                        if (confirm.toLowerCase() === "s") {
                            cart.addProduct(product);
                            await shoppingCartMenu(cart, categories.categories, user);
                        } else {
                            console.log("Producto no añadido al carrito.");
                        }
                    }
                }
                break;
            case 2:
                await shoppingCartMenu(cart, categories.categories, user);
                break;
            case 3:
                if (!showUserOrders(user.id)) break;
            
                const orderId = await questionString("Ingresa el ID de la orden para ver su estado: ");
                const selectedOrder = order.orders.find(o => o.user.id === user.id && o.id === orderId);
            
                if (!selectedOrder) {
                    console.error("Error: No se encontró una orden con ese ID.");
                    break;
                }
            
                console.log("\nEstado de tu pedido:");
                selectedOrder.showOrderState();
                break;
            case 4:
                await users.edit(user.id);
                break;
            case 5:
                condition = false;
                break;

            default:
                console.error("Error: Ingresa una opción válida");
                break;
        }

    } while (condition);
}
