import { questionNumber } from "../classes/readline";
import { adminProducts } from "../functions/adminProducts";
import { CategoryInterface } from "../interfaces/categoryInterface";

export async function adminSelectionProductsMenu(category: CategoryInterface) {
    let condition = true;
    const categoria = category;

    do {
        console.log(`\nQué desea hacer en la categoría: ${category.name}`);
        console.log("1. Mostrar productos");
        console.log("2. Añadir producto");
        console.log("3. Editar producto");
        console.log("4. Eliminar producto");
        console.log("5. Volver");
        const option = await questionNumber("Opción: ");

        if (option === 5) {
            condition = false;
        } else if (!isNaN(option)) {
            await adminProducts(option, categoria);
        } else {
            console.error("Error: Ingrese una opción válida");
        }

    } while (condition);
}
