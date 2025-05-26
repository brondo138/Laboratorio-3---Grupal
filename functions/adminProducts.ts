import { questionString } from "../classes/readline";
import { CategoryInterface } from "../interfaces/categoryInterface";

export async function adminProducts(option: number, category: CategoryInterface) {
    switch (option) {
        case 1:
            if (category.products.length > 0) {
                category.showAllAdmin();
            }else{
                console.error("Error: No se ha registrado nigun producto, pero puedes registrar un producto.");
            }
            break;
        case 2:
            await category.create();
            break;
        case 3:
            if (category.products.length === 0) {
                console.error("Error: No se ha registrado nigun producto, pero puedes registrar un producto.");
            }else{
                category.showAllAdmin();
                const editID = await questionString("Ingresa el id de la categoria a editar:");
                await category.edit(editID);
            }
            break;
        case 4:
            if (category.products.length === 0) {
                console.error("Error: No se ha registrado nigun producto, pero puedes registrar un producto.");
            }else{
                category.showAllAdmin();
                const deleteID = await questionString("Ingresa el id del producto que desea eliminar:");
                category.delete(deleteID);
            }
            break;
        default:
            break;
    }
}