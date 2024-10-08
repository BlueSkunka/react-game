import {UserInterface} from "../../interfaces/UserInterface.ts";
import userRegister from "@repositories/userRepository.ts";

export default async function registerUser(user: UserInterface) {
    return await userRegister(user)
}