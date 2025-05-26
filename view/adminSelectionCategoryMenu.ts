import { categories } from "../classes/categories";
import { questionNumber } from "../classes/readline";
import { adminSelectionProductsMenu } from "./adminSelectionProductsMenu";

export async function adminSelectionCategoryMenu() {
    if (categories.categories.length === 0) {
        console.error("Error: No se ha creado ninguna categoría, pero puedes crear una.");
        return;
    }

    let condition = true;

    do {
        console.log("\nGestión de Productos por Categoría");
        console.log("Seleccione la categoría que desea gestionar:");

        categories.showAll();
        const exitOption = categories.categories.length + 1;
        console.log(`${exitOption}. Salir`);

        const option = await questionNumber("Opción: ");

        if (isNaN(option)) {
            console.error("Error: Ingrese una opción válida.");
        } else if (option === exitOption) {
            condition = false;
        } else if (option >= 1 && option <= categories.categories.length) {
            const category = categories.categories[option - 1];
            await adminSelectionProductsMenu(category);
        } else {
            console.error("Error: Opción fuera de rango.");
        }

    } while (condition);
}
