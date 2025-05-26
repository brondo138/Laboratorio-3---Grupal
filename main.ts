import { closeRD, questionNumber } from "./classes/readline";
import { login } from "./functions/login";
import { signUp } from "./functions/signUp";

async function main() {
    let condition = true;

    do {
        console.log(`Bienvenido`);
        console.log(`1. Iniciar sesión `);
        console.log(`2. Resgistrarme`);
        console.log(`3. Salir`);
        const option = await questionNumber("Opcion: ");

    switch (option) {
        case 1:
            await login();
            break;
        case 2: 
            await signUp()
            break;
        case 3: 
            condition = false;
            closeRD();
            break;
        default:
            console.error("Error: Ingresa una opcion valida");
            break;
    }
    } while (condition);
}

main();