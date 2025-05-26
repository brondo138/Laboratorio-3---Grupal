import { questionNumber, questionString } from "../classes/readline";
import { users } from "../classes/users";

export async function adminUserMenu(){
    let condition = true;

    do {
        console.log(`\nQue desea hacer en: Gestionar usuarios`);
        console.log(`1. Mostrar `);
        console.log(`2. Añadir`);
        console.log(`3. Editar`);
        console.log(`4. Eliminar`);
        console.log(`5. Volver`);
        const option = await questionNumber("Opcion: ");

        switch (option) {
            case 1:
                users.showAll();
                break;
            case 2:
                await users.create();
                break;
            case 3:
                users.showAll();
                const editID = await questionString("Ingresa el id del usuario a editar:");
                await users.edit(editID);
                break;
            case 4:
                users.showAll();
                const deleteID = await questionString("Ingresa el id del usuario que desea eliminar:");
                const user = users.users.find(user => user.email === deleteID)
                
                if (user) {
                    const validation = (await questionString(`¿Esta seguro de eliminar al usuario${user.name}? (Si/No)`)).toLowerCase();

                    if(validation === "si"){
                        await users.delete(deleteID);
                    }

                    
                }else{
                    await users.delete(deleteID);
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