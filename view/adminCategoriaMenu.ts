import { categories } from "../classes/categories";
import { questionNumber, questionString } from "../classes/readline";

export async function adminCategoryMenu() {
    let condition = true;

    do {
        console.log(`\nQue desea hacer en: Gestionar categorias`);
        console.log(`1. Mostrar `);
        console.log(`2. Añadir`);
        console.log(`3. Editar`);
        console.log(`4. Eliminar`);
        console.log(`5. Volver`);
        const option = await questionNumber("Opcion: ");

        switch (option) {
            case 1:
                if (categories.categories.length === 0) {
                    console.error("Error: No se ha creado ninguna categoria creada pero puedes crear una");
                }else{
                    categories.showAllAdmin();
                }
                break;
            case 2:
                await categories.create();
                break;
            case 3:
                if (categories.categories.length === 0) {
                    console.error("Error: No se ha creado ninguna categoria creada pero puedes crear una");
                }else{
                    categories.showAllAdmin()
                    const editID = await questionString("Ingresa el id de la categoria a editar:");
                    await categories.edit(editID);
                }
                break;
            case 4:
                if (categories.categories.length === 0) {
                    console.error("Error: No se ha creado ninguna categoria creada pero puedes crear una");
                }else{
                    categories.showAllAdmin();
                    const deleteID = await questionString("Ingresa el id de la categoria que desea eliminar:");
                    categories.delete(deleteID);
                }
                break;
            case 5:
                condition = false;
                break;
            default:
                console.error("Error: Ingresa una opcion valida");
                break;
        }
    } while (condition);
}