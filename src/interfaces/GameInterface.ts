export interface GameInterface {
    id: string,
    createdAt: Date,
    updatedAt: Date,
    isPublic: boolean,
    joiningCode: string,
    creator: string,
    player: string,
    state: string,
    winner: string,
    winnerScore: number
}