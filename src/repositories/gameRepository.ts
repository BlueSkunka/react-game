import {HTTPMethodsEnum} from "../enums/HTTPMethodsEnum.ts";
import {authHeaders} from "@services/apiService.ts";

const url = import.meta.env.VITE_API_ENDPOINT;
const urlFetch: string = url.concat("/game/:gameId/:userId")
const urlList: string = url.concat("/games");
const urlUpdate: string = url.concat("/game/:action/:gameId")
const urlListByUser: string = url.concat("/game/:userId")

export async function gameCreate(userId: string, token: string) {
    return await fetch(url + "/game", {
        method: HTTPMethodsEnum.POST,
        body: JSON.stringify({'userId': userId}),
        headers: authHeaders(token)
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}

export async function gameFetch(userId: string, token: string, gameId: string) {
    const cUrl = urlFetch.replace(":gameId", gameId).replace(":userId", userId);
    console.log(cUrl)
    return await fetch(cUrl, {
        method: HTTPMethodsEnum.GET,
        headers: authHeaders(token)
    }).then((response) => {
        return response.json();
    }).catch((error) => {
         return error
    })
}

export async function gameList(token: string) {
    return await fetch(urlList, {
        method: HTTPMethodsEnum.GET,
        headers: authHeaders(token)
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}

export async function gameListByUser(token: string, userId: string) {
    return await fetch(urlListByUser.replace(":userId", userId), {
        method: HTTPMethodsEnum.GET,
        headers: authHeaders(token)
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}

export async function gameJoin(token: string, userId: string, gameId: string, action: string) {
    const cUrl = urlUpdate.replace(":gameId", gameId).replace(":action", action)

    return await fetch(cUrl, {
        method: HTTPMethodsEnum.PATCH,
        headers: authHeaders(token),
        body: JSON.stringify({"userId": userId})
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}