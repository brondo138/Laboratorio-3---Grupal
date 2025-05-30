import { BaseValidator } from "../BaseValidator";

export class UserValidator extends BaseValidator{
    public handle(request: any): string | null{
        if(request.username === ``)
            return `El nombre de usuario no puede estar vacio `

        return super.handle(request)
    }
}

export class EmailValidator extends BaseValidator{
    public handle(request: any): string | null {
        const emailRegex = /^[^\@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(request.email))
            return `El email no es valido, debe incluir un @. `
        return super.handle(request)
    }
}

export class PasswordValidator extends BaseValidator{
    public handle(request: any): string | null {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if(!passwordRegex.test(request.password))
            return `Error: La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula y un número. `
        return super.handle(request)
    }
}