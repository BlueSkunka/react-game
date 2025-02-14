import {GameInterface} from "@interfaces/GameInterface.ts";
import {GenericImage} from "@atom/images/GenericImage.tsx";

export function GameHistoryRow(
    {game, userId}: {game: GameInterface, userId: string}
) {
    const isWinner = game.winner == userId
    return (
        <>
            <div className={`flex flex-wrap items-center space-x-4 justify-evenly align-middle bordered border-2 rounded-md ${isWinner ? 'bg-success' : 'bg-error'} brightness-125`}>
                <div className={'flex items-center space-x-4'}>
                    <GenericImage image={isWinner ? 'pikachu' : 'fantominus'} alt={isWinner ? 'pikachu' : 'fantominus'} className={'w-16 mr-2'} />
                    {isWinner ? 'Victory' : 'Defeat'}
                </div>
                <div>
                    {game.createdAt.toLocaleString()}
                </div>
                <div className={'flex'}>
                    {game.creator}
                    <GenericImage image={'versus'} alt={'versus'} className={'w-8 mx-2'} />
                    {game.player}
                </div>
                <div>
                    Mon équipe (TODO)
                </div>
            </div>
        </>
    );
}