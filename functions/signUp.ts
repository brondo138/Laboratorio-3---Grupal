import { users } from "../classes/users";

export async function signUp() {
    await users.create();
}