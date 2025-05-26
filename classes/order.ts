import { OrderStateEnum } from "../enum/OrderStateEnum";
import { OrderInterface } from "../interfaces/orderInterface";
import { UserInterface } from "../interfaces/userInterface";

export class Order implements OrderInterface{
    constructor(public id: string, public user: UserInterface, public orderState: OrderStateEnum = OrderStateEnum.PENDIENTE, public address: string){}

    showOrderState(): void {
        console.log(`Orden: "${this.id}" `);
        console.log(`Direccion: ${this.address}`);
        console.log(`Estado: ${this.orderState}`);
    }
}