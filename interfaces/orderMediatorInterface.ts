import { OrderInterface } from "./orderInterface";
import { OrderStateEnum } from "../enum/OrderStateEnum";

export interface OrderMediatorInterface {
    changeOrderState(order: OrderInterface, newState: OrderStateEnum): void;
}
