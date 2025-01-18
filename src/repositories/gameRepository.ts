import {RequestHeaderEnum} from "../enums/RequestHeaderEnum.ts";
import {RequestHeaderParamEnum} from "../enums/RequestHeaderParamEnum.ts";

const url = import.meta.env.VITE_API_ENDPOINT;
const urlFetch: string = url.concat("/game/:gameId/:userId")

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

export async function gameFetch(userId: string, token: string, gameId: string) {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON);
    headers.append(RequestHeaderEnum.AUTH, RequestHeaderParamEnum.BEARER + token);

    const cUrl = urlFetch.replace(":gameId", gameId).replace(":userId", userId);
    console.log(cUrl)
    return await fetch(cUrl, {
        method: 'GET',
        headers: headers
    }).then((response) => {
        return response.json();
    }).catch((error) => {
         return error
    })
}