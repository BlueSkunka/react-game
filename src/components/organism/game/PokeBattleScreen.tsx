import {GameInterface} from "@interfaces/GameInterface.ts";
import {GameInfos} from "@organism/game/battle/GameInfos.tsx";

export function PokeBattleScreen(
    {game}:
    {
        game: GameInterface
    }
) {
    console.log("PokeBattleScreen", game)

    return (
        <>
            <div className="flex flex-col min-h-[calc(100vh-120px)]">
                <div className="flex">
                    <div className="w-4/5">
                        <GameInfos game={game} />
                    </div>
                    <div className="">
                        Leave button
                    </div>
                </div>
                <div className="battle-screen bg-neutral h-[48rem] bordered border-2 p-2 flex flex-col">
                    <div className="opponent-section h-2/5">
                        Opponent
                    </div>
                    <div className="player-section  h-2/5">
                        Current player
                    </div>
                    <div className="actions">
                        Actions or text
                    </div>
                </div>
            </div>
        </>
    );
}