import { CartItemInterface } from "./cartItemInterface";
import { CategoryInterface } from "./categoryInterface";
import { ProductInterface } from "./productInterface";
import { UserInterface } from "./userInterface";

export interface ShoppingCartInterface {
    items: CartItemInterface[]
    addProduct(product: ProductInterface, total: number): void;
    removeProduct(): Promise<void>;
    showCart(): void;
    clearCart(): void;
    checkout(categories: CategoryInterface[], user: UserInterface): Promise<void>;
}
