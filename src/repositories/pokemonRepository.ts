import {HTTPMethodsEnum} from "../enums/HTTPMethodsEnum.ts";
import {authHeaders} from "@services/apiService.ts";

const url: string = import.meta.env.VITE_API_ENDPOINT
const urlList: string = url.concat("/pokemons")

export async function pokemonList(token: string) {
    return await fetch(urlList, {
        method: HTTPMethodsEnum.GET,
        headers: authHeaders(token)
    }).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}