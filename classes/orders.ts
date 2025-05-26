import { OrderStateEnum } from "../enum/OrderStateEnum";
import { generateID } from "../functions/generateID";
import { OrderInterface, OrdersInterface } from "../interfaces/orderInterface";
import { UserInterface } from "../interfaces/userInterface";
import { Order } from "./order";
import { questionNumber, questionString } from "./readline";

export class Orders implements OrdersInterface{
    orders: OrderInterface[] = [];
    
    generateUniqueId(): string {
        let nuevoId: string;
            
            do {
                nuevoId = generateID();
            } while (this.orders.some(user => user.id === nuevoId));
            return nuevoId;
    }
    
    async create(user: UserInterface): Promise<void> {
        const id = this.generateUniqueId();
        const orderstate = OrderStateEnum.PENDIENTE;
        const country = await questionString("Ingresa el pais donde sera la entraga: ");
        const city = await questionString("Ingresa la ciudad donde sera la entrega: ");
        const street = await questionString("Ingresa la calle donde sera la entrega: ");
        const house = await questionString("Ingresa el numero de casa o apartamento donde sera la entrega: ");
        const address = `${street} ${house}, ${city} ${country}`

        this.orders.push(new Order(id, user, orderstate, address));
        console.log("Orden registrada exitosamente.");
    }

    async edit(id: string): Promise<void> {
        if (this.orders.length>0) {
            this.showAll();
            const order = this.orders.find(o => o.id === id);

            if (order) {
                let condition = true;

                do {
                    console.log(`¿En que estado esta la orden?`);
                    console.log(`1. Pendiente`);
                    console.log(`2. Cancelada`);
                    console.log(`3. En camino`);
                    console.log(`4. Entregada`);
                    console.log(`5. Volver`);
                    const option = await questionNumber("Opcion: ");
                    switch (option) {
                        case 1:
                            order.orderState = OrderStateEnum.PENDIENTE;
                            console.log(`Cambio de estado Exitoso`);
                            condition = false;
                            break;
                        case 2:
                            order.orderState = OrderStateEnum.CANCELADA;
                            console.log(`Cambio de estado Exitoso`);
                            condition = false;
                            break;
                        case 3:
                            order.orderState = OrderStateEnum.EN_CAMINO;
                            console.log(`Cambio de estado Exitoso`);
                            condition = false;
                            break;
                        case 4:
                            order.orderState = OrderStateEnum.ENTREGADO;
                            console.log(`Cambio de estado Exitoso`);
                            condition = false;
                            break;
                        case 5:
                            condition = false;
                            break;
                        default:
                            console.error("Error: Ingresa una opción válida");
                            break;
                    }
                } while (condition);
            }else{
                console.error("Error: Orden no encontrada");
            }
        }else{
            console.error("Error: Usuario no tiene orden procesada");
        }
    }

    showAll(): void {
        if (this.orders.length === 0) {
            console.error("Error: No hay órdenes registradas.");
            return;
        }
    
        console.log("\nLista de todas las órdenes registradas:");
        this.orders.forEach(order => {
            console.log(`- ID: ${order.id} | Estado: ${order.orderState}`);
        });
    }
    
    
    
    delete(id: string): void {
        const order = this.orders.find(order => order.id === id);
    
        if (order) {
            this.orders = this.orders.filter(order => order.id !== id);
            console.log("Orden eliminada correctamente.");
        } else {
            console.error("Error: Orden no encontrada.");
        }
    }    
}
export const order = new Orders();