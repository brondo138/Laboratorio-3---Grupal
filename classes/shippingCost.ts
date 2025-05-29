import { ShoppingCartInterface } from "../interfaces/shoppingCartInterface";

export class ShippingCost {
    constructor(private list: { quantity: number }[]) {}

    public getShippingCost(): number {
        let totalUnits = 0;

        for (let item of this.list) {
        totalUnits += item.quantity;
    }
    return totalUnits >= 10 ? 10 : 4;
    }
}
