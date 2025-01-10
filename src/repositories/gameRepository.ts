import {RequestHeaderEnum} from "../enums/RequestHeaderEnum.ts";
import {RequestHeaderParamEnum} from "../enums/RequestHeaderParamEnum.ts";

const url = import.meta.env.VITE_API_ENDPOINT;

export async function gameCreate(userId: string, token: string) {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON);
    headers.append(RequestHeaderEnum.AUTH, RequestHeaderParamEnum.BEARER + token)

    return await fetch(url + "/game", {
        method: 'POST',
        body: JSON.stringify({'userId': userId}),
        headers: headers
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}