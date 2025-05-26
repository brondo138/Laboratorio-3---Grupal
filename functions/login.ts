import { questionString } from "../classes/readline";
import { users } from "../classes/users";
import { adminMenu } from "../view/adminMenu";
import { userMenu } from "../view/userMenu";

export async function login() {
    console.log("\nIniciar sesión");
    const email: string = await questionString("Ingrese su correo electronico: ");
    const password: string = await questionString("Ingrese su contraseña: ");

    const user = users.users.find(user => user.email === email);//Buscar email

    if (user) {
        if (user.password === password) {
            if(email === users.users[0].email && password === users.users[0].password){
                await adminMenu(user);
            }else{
                await userMenu(user);
            }
        }else{
            console.error("Error: Contraseña ingresada invalida");
        }
    }else{
        console.error("Error: Correo electronico no encontrado");
    }
}