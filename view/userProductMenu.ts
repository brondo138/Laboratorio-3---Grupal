import { questionNumber } from "../classes/readline";
import { CategoryInterface } from "../interfaces/categoryInterface";
import { ProductInterface } from "../interfaces/productInterface";

export async function userProductMenu(category: CategoryInterface): Promise<ProductInterface | void> {
    if (category.products.length === 0) {
        console.error("Error: No se han ingresado productos todavía.");
        return;
    }

    let condition = true;

    do {
        console.log(`\nProductos en la categoría: ${category.name}`);
        category.showAll();
        console.log(`${category.products.length + 1}. Volver`);

        const option = await questionNumber("Selecciona un producto: ");

        if (isNaN(option)) {
            console.error("Error: Ingrese una opción válida.");
            continue;
        }

        const volverOption = category.products.length + 1;

        if (option === volverOption) {
            return;
        }

        if (option >= 1 && option <= category.products.length) {
            const product = category.products[option - 1];
            return product;
        } else {
            console.error("Error: Opción fuera de rango.");
        }

    } while (condition);
}
