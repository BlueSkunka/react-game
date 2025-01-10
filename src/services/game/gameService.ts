import {gameCreate} from "@repositories/gameRepository.ts";

export async function createGame(userId: string, token: string) {
    return await gameCreate(userId, token);
}