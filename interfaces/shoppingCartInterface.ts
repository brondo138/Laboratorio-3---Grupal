import { CategoryInterface } from "./categoryInterface";
import { ProductInterface } from "./productInterface";
import { UserInterface } from "./userInterface";

export interface ShoppingCartInterface {
    addProduct(product: ProductInterface): void;
    removeProduct(): Promise<void>;
    showCart(): void;
    clearCart(): void;
    checkout(categories: CategoryInterface[], user: UserInterface): Promise<void>;
}
