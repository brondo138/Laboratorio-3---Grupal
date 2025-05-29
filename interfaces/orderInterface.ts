import { OrderStateEnum } from "../enum/OrderStateEnum";
import { UserInterface } from "./userInterface";

export interface OrderInterface{
    id: string;
    user: UserInterface;
    orderState: OrderStateEnum;
    address: string;
    showOrderState(): void;
}

export interface OrdersInterface{
    orders: OrderInterface[];
    generateUniqueId(): string;
    create(user: UserInterface): Promise<boolean>;
    edit(id: string): Promise<void>;
    showAll(): void;
    delete(id: string): void;
}