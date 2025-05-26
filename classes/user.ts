import { UserInterface } from "../interfaces/userInterface";

export class User implements UserInterface {
    constructor(public id: string, public name: string, public email: string, public password: string) {}
}
