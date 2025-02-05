import {PokemonTypeInterface} from "@interfaces/PokemonTypeInterface.ts";

export interface PokemonInterface {
    id: string,
    name: string,
    sprite: string,
    statPV: number,
    statATK: number,
    statDEF: number,
    statSpeATK: number,
    statSpeDEF: number,
    statVIT: number,
    typePrimary: PokemonTypeInterface,
    typeSecondary: PokemonTypeInterface
}