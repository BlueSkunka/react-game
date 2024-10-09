import {UserInterface} from "../../interfaces/UserInterface.ts";
import {userLogin, userRegister, userValdiateEmail} from "@repositories/userRepository.ts";

export async function registerUser(user: UserInterface) {
    return await userRegister(user)
}

export async function login(user) {
    return await userLogin(user);
}

export async function validateEmail(id: string) {
    return await userValdiateEmail(id);
}