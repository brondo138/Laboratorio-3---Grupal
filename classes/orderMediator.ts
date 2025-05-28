import { OrderMediatorInterface } from "../interfaces/orderMediatorInterface";
import { OrderInterface } from "../interfaces/orderInterface";
import { OrderStateEnum } from "../enum/OrderStateEnum";

export class OrderMediator implements OrderMediatorInterface {
    private statePriority: Record<OrderStateEnum, number> = {
        [OrderStateEnum.PENDIENTE]: 1,
        [OrderStateEnum.EN_CAMINO]: 2,
        [OrderStateEnum.ENTREGADO]: 3,
        [OrderStateEnum.CANCELADA]: 99 
    };

    public changeOrderState(order: OrderInterface, newState: OrderStateEnum): void {
        const current = order.orderState;

        if (current === OrderStateEnum.ENTREGADO) {
            console.error(`No se puede cambiar el estado de una orden ya entregada.`);
            return;
        }

        if (current === OrderStateEnum.CANCELADA) {
            console.error(`No se puede cambiar el estado de una orden cancelada.`);
            return;
        }

        if (newState === OrderStateEnum.CANCELADA) {
            order.orderState = newState;
            console.log(`Orden cancelada correctamente.`);
            return;
        }

        const currentPriority = this.statePriority[current];
        const newPriority = this.statePriority[newState];

        if (newPriority < currentPriority) {
            console.error(`No se puede cambiar de "${current}" a un estado anterior "${newState}".`);
            return;
        }

        order.orderState = newState;
        console.log(`Estado de la orden cambiado de "${current}" a "${newState}".`);
    }
}
