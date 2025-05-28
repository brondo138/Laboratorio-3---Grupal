import { generateID } from "../functions/generateID";
import { CrudInterface } from "../interfaces/crudInterface";
import { UserInterface } from "../interfaces/userInterface";
import { questionNumber, questionString } from "./readline";
import { User } from "./user";

export class Users implements CrudInterface {
    users: UserInterface[] = [new User("1", "Admin", "admin@admin.com", "admin"), new User("2", "Alex", "@", "123")];

    generateUniqueId(): string {
        let nuevoId: string;
        do {
            nuevoId = generateID();
        } while (this.users.some(user => user.id === nuevoId));
        return nuevoId;
    }

    private isStrongPassword(password: string): boolean {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return regex.test(password);
    }

    async create(): Promise<void> {
        const id = this.generateUniqueId();

        let name: string;
        do {
            name = await questionString("\nIngresa tu nombre de usuario: ");
            if (!name.trim()) {
                console.error("Error: El nombre de usuario no puede estar vacío.");
            }
        } while (!name.trim());

        let email: string;
        let emailValido = false;
        do {
            email = await questionString("Ingresa tu correo electrónico: ");

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                console.error("Error: Formato de correo electrónico inválido.");
                continue;
            }

            if (this.users.some(user => user.email === email)) {
                console.error("Error: Ya existe un usuario registrado con ese correo electrónico.");
                continue;
            }

            emailValido = true;
        } while (!emailValido);

        let password: string;
        do {
            password = await questionString("Ingresa tu contraseña (mínimo 8 caracteres, con mayúscula, minúscula y número): ");
            if (!this.isStrongPassword(password)) {
                console.error("Error: La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.");
            }
        } while (!this.isStrongPassword(password));

        this.users.push(new User(id, name, email, password));
        console.log(`\nUsuario ${name} registrado exitosamente\n`);
    }

    async edit(id: string): Promise<void> {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            console.error("Error: Usuario no encontrado.");
            return;
        }

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
                let newName: string;
                do {
                    newName = await questionString("Ingrese el nuevo nombre de usuario: ");
                    if (!newName.trim()) {
                        console.error("Error: El nombre no puede estar vacío.");
                    }
                } while (!newName.trim());

                user.name = newName;
                console.log("Nombre actualizado correctamente.");
                break;

            case 2:
                let newEmail: string;
                let emailValido = false;

                do {
                    newEmail = await questionString("Ingrese el nuevo correo electrónico: ");

                    if (newEmail === user.email) {
                        console.log("El correo ingresado es el mismo que el actual. No se realizaron cambios.");
                        return;
                    }

                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
                        console.error("Error: Formato de correo electrónico inválido.");
                        continue;
                    }

                    if (this.users.some(u => u.email === newEmail)) {
                        console.error("Error: Ya existe otro usuario con ese correo.");
                        continue;
                    }

                    emailValido = true;
                } while (!emailValido);

                user.email = newEmail;
                console.log("Correo electrónico actualizado correctamente.");
                break;

            case 3:
                let newPassword: string;
                do {
                    newPassword = await questionString("Ingrese la nueva contraseña (mínimo 8 caracteres, con mayúscula, minúscula y número): ");
                    if (!this.isStrongPassword(newPassword)) {
                        console.error("Error: La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número.");
                    }
                } while (!this.isStrongPassword(newPassword));

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
        console.log("\n=== Lista de Usuarios Registrados ===");
        this.users.forEach((user, i) => {
            console.log(`${i + 1}. ID: ${user.id}, Nombre: ${user.name}, Correo electrónico: ${user.email}`);
        });
    }

    delete(id: string): void {
        const user = this.users.find(user => user.id === id);

        if (!user) {
            console.error("Error: Usuario no encontrado.");
            return;
        }

        if (user.id === "1") {
            console.error("Error: No se puede eliminar al usuario administrador.");
            return;
        }

        this.users = this.users.filter(user => user.id !== id);
        console.log("Usuario eliminado correctamente.");
    }
}

export const users = new Users();
