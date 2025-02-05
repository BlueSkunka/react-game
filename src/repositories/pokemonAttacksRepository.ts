import {HTTPMethodsEnum} from "../enums/HTTPMethodsEnum.ts";
import {authHeaders} from "@services/apiService.ts";

const url: string = import.meta.env.VITE_API_ENDPOINT
const urlListAttacksByPokemon: string = url.concat("/pokemonAttacks/pokemon/:pokemonId");

const params: object = {
    pokemonId: ':pokemonId'
}

export async function listAttacksByPokemon(token: string, pokemonId: string) {
    return await fetch(
        urlListAttacksByPokemon.replace(params.pokemonId, pokemonId),
        {
            method: HTTPMethodsEnum.GET,
            headers: authHeaders(token)
        }
    ).then((response) => {
        return response.json()
    }).catch((error) => {
        return error
    })
}