import { generateID } from "../functions/generateID";
import { CategoriesInterface, CategoryInterface } from "../interfaces/categoryInterface";
import { Category } from "./category";
import { Product } from "./product";
import { questionString } from "./readline";

export class Categories implements CategoriesInterface{
    categories: CategoryInterface[] = (() => {
        const ropa = new Category("1", "Ropa");
        ropa.products.push(new Product("1", "Camisa", 20, "Camisa Roja", 100, ["img.png"], 50, 13));
        return [ropa];
    })();
    generateUniqueId(): string {
        let nuevoId: string;
        do {
            nuevoId = generateID();
        } while (this.categories.some(category => category.id === nuevoId));
        return nuevoId;
    }
    
    async create(): Promise<void> {
        const id = this.generateUniqueId();
        const name = await questionString("\nIngresa el nombre de la categoria: ");
        this.categories.push(new Category(id,name))
        console.log(`Categoria: ${name}, creada correctamente`);
    }

    showAll(): void {
        for (let i = 0; i < this.categories.length; i++) {
            console.log(`${i+1}. ${this.categories[i].name}`);
        }
    }

    showAllAdmin(): void {
        for (let i = 0; i < this.categories.length; i++) {
            console.log(`${i+1}. ID: ${this.categories[i].id}, Nombre:${this.categories[i].name}`);
        }
    }

    async edit(id: string): Promise<void> {
        const category = this.categories.find(category => category.id === id);

        if (category) {
            const newName = await questionString("Ingrese el nuevo nombre para la categoria: ");
            category.name = newName;
        }else{
            console.error("Error: Categoria no encotrada");
        }
    }

    delete(id: string): void{
        const category = this.categories.find(category => category.id === id);

        if (category) {
            this.categories = this.categories.filter(categories => categories.id !== id);
            console.log("Categoria eliminada correctamente");
        }else{
            console.error("Error: Categoria no encotrada");
        }
    }
}

export const categories = new Categories();