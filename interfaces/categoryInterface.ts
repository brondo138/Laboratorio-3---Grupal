import { CrudInterface } from "./crudInterface";
import { ProductInterface } from "./productInterface";

export interface CategoryInterface extends CrudInterface {
    id: string;
    name: string;
    products: ProductInterface[];
    generateUniqueId(): string;
    showAllAdmin(): void;
}


export interface CategoriesInterface extends CrudInterface{
    categories: CategoryInterface[];
    generateUniqueId(): string;
    showAllAdmin(): void;
}
