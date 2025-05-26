import { order } from "../classes/orders";
import { questionNumber, questionString } from "../classes/readline";
import { users } from "../classes/users";
import { UserInterface } from "../interfaces/userInterface";
import { adminCategoryMenu } from "./adminCategoriaMenu";
import { adminSelectionCategoryMenu } from "./adminSelectionCategoryMenu";
import { adminUserMenu } from "./adminUserMenu";

export async function adminMenu(user: UserInterface){
    let condition = true;

    do {
        console.log(`\nBienvenido ${user.name} ¿que desea hacer?`);
        console.log(`1. Gestionar usuarios`);
        console.log(`2. Gestionar categorias`);
        console.log(`3. Gestionar productos`);
        console.log(`4. Gestionar Envios`);
        console.log(`5. Volver`)
        const option = await questionNumber("Opcion: ");

        switch (option) {
            case 1:
                await adminUserMenu();
                break;
            case 2: 
                await adminCategoryMenu();
                break;
            case 3:
                await adminSelectionCategoryMenu();
                break;
            case 4:
                const usersWithOrders = users.users.filter(u => order.orders.some(o => o.user.id === u.id));
            
                if (usersWithOrders.length === 0) {
                    console.error("Error: No hay usuarios con órdenes registradas.");
                    break;
                }
            
                console.log("\n📦 Usuarios con órdenes activas:");
                usersWithOrders.forEach(u => {
                    console.log(`Nombre: ${u.name}, Email: ${u.email}, ID: ${u.id}`);
                });
            
                const idUser = await questionString("\n🆔 Ingresa el ID del usuario para ver sus órdenes: ");
                const selectedUser = usersWithOrders.find(u => u.id === idUser);
            
                if (!selectedUser) {
                    console.error("Error: Usuario no encontrado o no tiene órdenes registradas.");
                    break;
                }
            
                const userOrders = order.orders.filter(o => o.user.id === selectedUser.id);
            
                if (userOrders.length === 0) {
                    console.error("Error: Este usuario no tiene órdenes activas.");
                    break;
                }
            
                // Mostrar solo sus órdenes
                userOrders.forEach(o => {
                    console.log(`- ID: ${o.id} | Estado: ${o.orderState}`);
                });
            
                const orderId = await questionString("Ingresa el ID de la orden a gestionar: ");
                const selectedOrder = userOrders.find(o => o.id === orderId);
            
                if (!selectedOrder) {
                    console.error("Error: No se encontró una orden con ese ID.");
                    break;
                }
            
                console.log("\n¿Qué deseas hacer con esta orden?");
                console.log("1. Editar estado");
                console.log("2. Eliminar orden");
                console.log("3. Volver");
            
                const action = await questionNumber("Opcion: ");
            
                switch (action) {
                    case 1:
                        await order.edit(selectedOrder.id);
                        break;
                    case 2:
                        order.delete(selectedOrder.id);
                        break;
                    case 3:
                        break;
                    default:
                        console.error("Error: Opcion inválida.");
                        break;
                }
            
                break;
                
            case 5: 
                condition = false;
                break;
            default:
                console.error("Error: Ingresa una opcion valida");
                break;
        }
    } while (condition);
}