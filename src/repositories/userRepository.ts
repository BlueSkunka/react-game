import {UserInterface} from "@interfaces/UserInterface.ts";
import {RequestHeaderEnum} from "../enums/RequestHeaderEnum.ts";
import {RequestHeaderParamEnum} from "../enums/RequestHeaderParamEnum.ts";

export default async function userRegister(user: UserInterface) {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON);

    return await fetch(import.meta.env.VITE_API_ENDPOINT + "/register", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: headers
    }).then((response) => {
        return response.json();
    }).catch((error) => {
        return error;
    })
}