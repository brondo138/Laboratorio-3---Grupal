import { OrderStateEnum } from "../enum/OrderStateEnum";
import { generateID } from "../functions/generateID";
import { OrderInterface, OrdersInterface } from "../interfaces/orderInterface";
import { UserInterface } from "../interfaces/userInterface";
import { Order } from "./order";
import { questionNumber, questionString } from "./readline";
import { OrderMediator } from "./orderMediator";

export class Orders implements OrdersInterface {
    orders: OrderInterface[] = [];
    private mediator = new OrderMediator();

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
        const country = await questionString("Ingresa el país donde será la entrega: ");
        const city = await questionString("Ingresa la ciudad donde será la entrega: ");
        const street = await questionString("Ingresa la calle donde será la entrega: ");
        const house = await questionString("Ingresa el número de casa o apartamento donde será la entrega: ");
        const address = `${street} ${house}, ${city} ${country}`;

        this.orders.push(new Order(id, user, orderstate, address));
        console.log("Orden registrada exitosamente.");
    }

    async edit(id: string): Promise<void> {
    if (this.orders.length > 0) {
        this.showAll();
        const order = this.orders.find(o => o.id === id);

        if (order) {
            let condition = true;

            while (condition) {
                console.log(`\n¿En qué estado está la orden?`);
                console.log(`1. Pendiente`);
                console.log(`2. En camino`);
                console.log(`3. Entregado`);
                console.log(`4. Cancelada`);
                console.log(`5. Volver`);
                const option = await questionNumber("Opción: ");

                switch (option) {
                    case 1:
                        this.mediator.changeOrderState(order, OrderStateEnum.PENDIENTE);
                        if (order.orderState === OrderStateEnum.PENDIENTE) condition = false;
                        break;
                    case 2:
                        this.mediator.changeOrderState(order, OrderStateEnum.EN_CAMINO);
                        if (order.orderState === OrderStateEnum.EN_CAMINO) condition = false;
                        break;
                    case 3:
                        this.mediator.changeOrderState(order, OrderStateEnum.ENTREGADO);
                        if (order.orderState === OrderStateEnum.ENTREGADO) condition = false;
                        break;
                    case 4:
                        this.mediator.changeOrderState(order, OrderStateEnum.CANCELADA);
                        if (order.orderState === OrderStateEnum.CANCELADA) condition = false;
                        break;
                    case 5:
                        console.log("Saliendo sin hacer cambios.");
                        condition = false;
                        break;
                    default:
                        console.error("Error: Ingresa una opción válida.");
                        break;
                }
            }
        } else {
            console.error("Error: Orden no encontrada.");
        }
    } else {
        console.error("Error: Usuario no tiene orden procesada.");
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
