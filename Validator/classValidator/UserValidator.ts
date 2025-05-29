import { BaseValidator } from "../BaseValidator";

export class UserValidator extends BaseValidator{
    public handle(request: any): string {
        if(request.username === ``)
            return `El nombre de usuario no puede estar vacio `

        return super.handle(request)
    }
}

export class EmailValidator extends BaseValidator{
    public handle(request: any): string {
        if(request.email === ``)
            return `El nombre de usuario no puede estar vacio `

        if(!request.email.includes("@"))
            return `El email debe llevar un @`
        
        return super.handle(request)
    }
}

export class PasswordValidator extends BaseValidator{
    public handle(request: any): string {
        if(request.password === ``)
            return `La contraseña no puede estar vacia `

        if(request.password.length < 6 )
            return `La contraseña no puede tener menos de 6 caracteres `
        
        return super.handle(request)
    }
}