import {UserInterface} from "../../interfaces/UserInterface.ts";
import {userLogin, userRegister} from "@repositories/userRepository.ts";

export async function registerUser(user: UserInterface) {
    return await userRegister(user)
}

export async function login(user) {
    return await userLogin(user);
}