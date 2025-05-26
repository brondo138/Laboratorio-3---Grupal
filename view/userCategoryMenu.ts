import { categories } from "../classes/categories";
import { questionNumber } from "../classes/readline";
import { CategoryInterface } from "../interfaces/categoryInterface";

export async function userCategoryMenu(): Promise<CategoryInterface  | void> {
    let condition = true;

    if (categories.categories.length === 0) {
        console.error("Error: No se han ingresado productos todavía.");
        return;
    }

    do {
        console.log("\nCategorías de productos:");
        categories.showAll();
        console.log(`${categories.categories.length + 1}. Volver`);

        const option = await questionNumber("Opción: ");

        if (isNaN(option)) {
            console.error("Error: Ingresa una opción válida.");
            continue;
        }

        const volverOption = categories.categories.length + 1;

        if (option === volverOption) {
            condition = false;
            return; // Volver sin seleccionar categoría
        }

        if (option >= 1 && option <= categories.categories.length) {
            const category = categories.categories[option - 1];
            condition = false;
            return category;
        } else {
            console.error("Error: Opción fuera de rango.");
        }

    } while (condition);
}
