import { generateID } from "../functions/generateID";
import { CrudInterface } from "../interfaces/crudInterface";
import { UserInterface } from "../interfaces/userInterface";
import { questionNumber, questionString } from "./readline";
import { User } from "./user";

export class Users implements CrudInterface{
    users: UserInterface[] = [new User("1", "Admin", "admin@admin.com","admin")]

    generateUniqueId(): string{
        let nuevoId: string;
        do {
            nuevoId = generateID();
        } while (this.users.some(user => user.id === nuevoId));
        return nuevoId;
    }

    async create(): Promise<void> {
        const id = this.generateUniqueId();
        const name = await questionString("\nIngresa tu nombre de usuario: ");
        const email = await questionString("Ingresa tu correo electrónico: ");
        const password = await questionString("Ingresa tu contraseña: ");
    
        if (!email.includes("@")) {
            console.error("Error: El correo electrónico debe contener un '@'.");
            return;
        }
    
        const existe = this.users.some(user => user.email === email);
    
        if (existe) {
            console.error("Error: Ya existe un usuario registrado con ese correo electrónico.");
            return;
        }
    
        this.users.push(new User(id, name, email, password));
        console.log(`\nUsuario ${name} registrado exitosamente\n`);
    }
    
    async edit(id: string): Promise<void> {
        const user = this.users.find(user => user.id === id); // Buscar por ID
    
        if (!user) {
            console.error("Error: Usuario no encontrado.");
            return;
        }
    
        // Validar que no se intente editar al admin
        if (user.id === "1") {
            console.error("Error: No se puede editar al usuario administrador.");
            return;
        }
    
        console.log(`\nEditando usuario: ${user.name}`);
        console.log("Seleccione una opción:");
        console.log("1. Cambiar nombre de usuario");
        console.log("2. Cambiar correo electrónico");
        console.log("3. Cambiar contraseña");
        console.log("4. Eliminar cuenta");
        console.log("5. Volver");
    
        const option = await questionNumber("Opción: ");
    
        switch (option) {
            case 1:
                const newName = await questionString("Ingrese el nuevo nombre de usuario: ");
                user.name = newName;
                console.log("Nombre actualizado correctamente.");
                break;
            case 2:
                const newEmail = await questionString("Ingrese el nuevo correo electrónico: ");
                user.email = newEmail;
                console.log("Correo electrónico actualizado correctamente.");
                break;
            case 3:
                const newPassword = await questionString("Ingrese la nueva contraseña: ");
                user.password = newPassword;
                console.log("Contraseña actualizada correctamente.");
                break;
            case 4:
                const confirm = await questionString("¿Estás seguro de eliminar esta cuenta? (s/n): ");
                if (confirm.toLowerCase() === "s") {
                    this.users = this.users.filter(u => u.id !== id);
                    console.log("Usuario eliminado correctamente.");
                } else {
                    console.log("Operación cancelada.");
                }
                break;
            case 5: 
                return;
            default:
                console.error("Error: Opción inválida.");
                break;
        }
    }
    

    showAll(): void {
        for (let i = 0; i < this.users.length; i++) {
            console.log(`${i+1}. ID: ${this.users[i].id}, Nombre: ${this.users[i].name}, Correo electronico: ${this.users[i].email}`);
        }
    }

    delete(id: string): void {
        const user = this.users.find(user => user.id === id); // Buscar por ID
    
        if (!user) {
            console.error("Error: Usuario no encontrado.");
            return;
        }
    
        // Validar que no se intente eliminar al admin
        if (user.id === "1") {
            console.error("Error: No se puede eliminar al usuario administrador.");
            return;
        }
    
        this.users = this.users.filter(user => user.id !== id);
        console.log("Usuario eliminado correctamente.");
    }
    
}


export const users = new Users();