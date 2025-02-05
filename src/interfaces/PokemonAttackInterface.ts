import {PokemonTypeInterface} from "@interfaces/PokemonTypeInterface.ts";

export interface PokemonAttackInterface {
    id: string,
    name: string,
    description: string,
    type: string,
    power: number,
    pp: number,
    precision: number,
    effect: number,
    effectRate: number,
    highCritical: boolean,
    priority: number,
    pokemonType: PokemonTypeInterface
}