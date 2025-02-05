import {pokemonList} from "@repositories/pokemonRepository.ts";

export async function listPokemon(token: string) {
    return await pokemonList(token);
}