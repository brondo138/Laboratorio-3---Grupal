import { questionNumber } from "../classes/readline";

export async function editProductMenu(): Promise<number | undefined> {
    console.log(`¿Que desea editar?`);
    console.log(`1. Nombre y descripcion del producto`);
    console.log(`2. Precio del producto`);
    console.log(`3. Oferta aplicada al producto`);
    console.log(`4. Imagenes del producto`);
    console.log(`5. Disponibilidad del producto`);
    console.log(`6. Volver`);
    const option = await questionNumber("Opcion: ");

    if (isNaN(option)) {
        console.error("Error: Ingresa una opcion valida");
        return;
    }

    return option;
}