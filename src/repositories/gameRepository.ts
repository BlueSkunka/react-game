import {RequestHeaderEnum} from "../enums/RequestHeaderEnum.ts";
import {RequestHeaderParamEnum} from "../enums/RequestHeaderParamEnum.ts";
import {HTTPMethodsEnum} from "../enums/HTTPMethodsEnum.ts";

const url = import.meta.env.VITE_API_ENDPOINT;
const urlFetch: string = url.concat("/game/:gameId/:userId")
const urlList: string = url.concat("/games");
const urlUpdate: string = url.concat("/game/:action/:gameId")

export async function gameCreate(userId: string, token: string) {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON);
    headers.append(RequestHeaderEnum.AUTH, RequestHeaderParamEnum.BEARER + token)

    return await fetch(url + "/game", {
        method: HTTPMethodsEnum.POST,
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
        method: HTTPMethodsEnum.GET,
        headers: headers
    }).then((response) => {
        return response.json();
    }).catch((error) => {
         return error
    })
}

export async function gameList(token: string) {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON);
    headers.append(RequestHeaderEnum.AUTH, RequestHeaderParamEnum.BEARER + token);

    return await fetch(urlList, {
        method: HTTPMethodsEnum.GET,
        headers: headers
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}

export async function gameJoin(token: string, userId: string, gameId: string, action: string) {
    const headers = new Headers();
    headers.append(RequestHeaderEnum.CONTENT_TYPE, RequestHeaderParamEnum.APPLICATION_JSON)
    headers.append(RequestHeaderEnum.AUTH, RequestHeaderParamEnum.BEARER + token)

    const cUrl = urlUpdate.replace(":gameId", gameId).replace(":action", action)

    return await fetch(cUrl, {
        method: HTTPMethodsEnum.PATCH,
        headers: headers,
        body: JSON.stringify({"userId": userId})
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}